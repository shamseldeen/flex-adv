<?php
/**
 * db.php — Dual-driver database layer (MySQL + PostgreSQL)
 *
 * Priority order for connection:
 *   1. MYSQL_URL   env var  → MySQL via PDO
 *   2. MYSQL_HOST  env var  → MySQL via PDO (individual vars)
 *   3. DATABASE_URL env var → auto-detect scheme (mysql:// or postgres://)
 *   4. No DB → all queries return [] safely
 *
 * The `dbDriver()` helper returns 'mysql' | 'pgsql' | null so callers
 * can write driver-aware SQL where needed (e.g. LIMIT syntax is identical
 * in both, but AUTO_INCREMENT vs SERIAL differs in DDL).
 */

function _dbConnect(): ?PDO {
    // ── 1. Explicit MYSQL_URL ──────────────────────────────────────────
    $mysqlUrl = getenv('MYSQL_URL');
    if ($mysqlUrl) {
        return _buildPdo($mysqlUrl, 'mysql');
    }

    // ── 2. Individual MySQL env vars ───────────────────────────────────
    $mysqlHost = getenv('MYSQL_HOST');
    if ($mysqlHost) {
        $port   = getenv('MYSQL_PORT')  ?: 3306;
        $dbname = getenv('MYSQL_DB')    ?: getenv('MYSQL_DATABASE') ?: 'flex_adv';
        $user   = getenv('MYSQL_USER')  ?: getenv('MYSQL_USERNAME') ?: 'root';
        $pass   = getenv('MYSQL_PASS')  ?: getenv('MYSQL_PASSWORD') ?: '';
        $dsn    = "mysql:host=$mysqlHost;port=$port;dbname=$dbname;charset=utf8mb4";
        try {
            return new PDO($dsn, $user, $pass, _pdoOptions());
        } catch (PDOException $e) {
            error_log('[DB] MySQL (env vars) Error: ' . $e->getMessage());
            return null;
        }
    }

    // ── 3. DATABASE_URL — auto-detect driver from scheme ───────────────
    $dbUrl = getenv('DATABASE_URL');
    if (!$dbUrl) return null;

    $scheme = strtolower(explode(':', $dbUrl)[0]);
    $driver = match(true) {
        str_starts_with($scheme, 'mysql')    => 'mysql',
        str_starts_with($scheme, 'mariadb')  => 'mysql',
        str_starts_with($scheme, 'postgres') => 'pgsql',
        default                              => 'pgsql',
    };
    return _buildPdo($dbUrl, $driver);
}

function _buildPdo(string $url, string $driver): ?PDO {
    $parsed = parse_url($url);
    $host   = $parsed['host'] ?? 'localhost';
    $port   = $parsed['port'] ?? ($driver === 'mysql' ? 3306 : 5432);
    $dbname = ltrim($parsed['path'] ?? '/', '/');
    $user   = urldecode($parsed['user'] ?? '');
    $pass   = urldecode($parsed['pass'] ?? '');

    if ($driver === 'mysql') {
        $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    } else {
        $dsn = "pgsql:host=$host;port=$port;dbname=$dbname";
        if (!empty($parsed['query'])) {
            parse_str($parsed['query'], $params);
            if (!empty($params['sslmode'])) $dsn .= ";sslmode={$params['sslmode']}";
        }
    }

    try {
        return new PDO($dsn, $user, $pass, _pdoOptions());
    } catch (PDOException $e) {
        error_log("[DB] $driver Error: " . $e->getMessage());
        return null;
    }
}

function _pdoOptions(): array {
    return [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
}

function getDB(): ?PDO {
    static $pdo = null;
    if ($pdo !== null) return $pdo;
    $pdo = _dbConnect();
    return $pdo;
}

/** Returns 'mysql' | 'pgsql' | null */
function dbDriver(): ?string {
    $db = getDB();
    if (!$db) return null;
    return $db->getAttribute(PDO::ATTR_DRIVER_NAME);
}

/** Run SELECT — returns array of rows */
function dbQuery(string $sql, array $params = []): array {
    $db = getDB();
    if (!$db) return [];
    try {
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        error_log('[DB] Query Error: ' . $e->getMessage() . ' | SQL: ' . $sql);
        return [];
    }
}

/** Run SELECT — returns first row or null */
function dbQueryOne(string $sql, array $params = []): ?array {
    $rows = dbQuery($sql, $params);
    return $rows[0] ?? null;
}

/** Run INSERT/UPDATE/DELETE — returns true on success */
function dbInsert(string $sql, array $params = []): bool {
    $db = getDB();
    if (!$db) return false;
    try {
        $stmt = $db->prepare($sql);
        return $stmt->execute($params);
    } catch (PDOException $e) {
        error_log('[DB] Write Error: ' . $e->getMessage() . ' | SQL: ' . $sql);
        return false;
    }
}

/** Returns count of affected rows from last INSERT/UPDATE/DELETE */
function dbExec(string $sql, array $params = []): int {
    $db = getDB();
    if (!$db) return 0;
    try {
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        return $stmt->rowCount();
    } catch (PDOException $e) {
        error_log('[DB] Exec Error: ' . $e->getMessage());
        return 0;
    }
}

/** Health check — returns connection info array or null */
function dbHealth(): ?array {
    $db = getDB();
    if (!$db) return null;
    $driver  = dbDriver();
    $version = $driver === 'mysql'
        ? dbQueryOne('SELECT VERSION() AS v')['v'] ?? 'unknown'
        : dbQueryOne('SELECT version() AS v')['v'] ?? 'unknown';
    return ['driver' => $driver, 'version' => $version, 'ok' => true];
}
