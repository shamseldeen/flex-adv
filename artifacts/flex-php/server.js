const http    = require('http');
const zlib    = require('zlib');
const { spawn } = require('child_process');
const { createProxyServer } = require('http-proxy');

const PORT     = parseInt(process.env.PORT) || 3002;
const PHP_PORT = PORT + 100;

// Start PHP built-in server
const php = spawn('php', ['-S', `127.0.0.1:${PHP_PORT}`, 'router.php'], {
  cwd: __dirname,
  stdio: ['ignore', 'pipe', 'pipe']
});
php.stdout.pipe(process.stdout);
php.stderr.pipe(process.stderr);

const COMPRESSIBLE = /^(text\/(html|css|javascript|plain|xml|json)|application\/(json|javascript|xml))/i;

function waitForPhp(callback, attempts = 0) {
  if (attempts > 20) { console.error('PHP did not start'); process.exit(1); }
  const req = http.request({ host: '127.0.0.1', port: PHP_PORT, path: '/', method: 'HEAD' }, () => callback());
  req.on('error', () => setTimeout(() => waitForPhp(callback, attempts + 1), 200));
  req.end();
}

waitForPhp(() => {
  const proxy = createProxyServer({
    target: `http://127.0.0.1:${PHP_PORT}`,
    selfHandleResponse: true,
  });

  proxy.on('proxyRes', (proxyRes, req, res) => {
    const ct  = proxyRes.headers['content-type'] || '';
    const enc = req.headers['accept-encoding'] || '';

    // Build response headers — strip old content-encoding/length first
    const headers = { ...proxyRes.headers };
    delete headers['content-encoding'];
    delete headers['content-length'];

    let compressor = null;
    if (COMPRESSIBLE.test(ct)) {
      if (/\bbr\b/.test(enc)) {
        headers['content-encoding'] = 'br';
        compressor = zlib.createBrotliCompress();
      } else if (/\bgzip\b/.test(enc)) {
        headers['content-encoding'] = 'gzip';
        compressor = zlib.createGzip();
      } else if (/\bdeflate\b/.test(enc)) {
        headers['content-encoding'] = 'deflate';
        compressor = zlib.createDeflate();
      }
    }

    // Write head ONCE with all final headers
    res.writeHead(proxyRes.statusCode, headers);

    if (compressor) {
      proxyRes.pipe(compressor).pipe(res);
    } else {
      proxyRes.pipe(res);
    }
  });

  proxy.on('error', (err, req, res) => {
    if (!res.headersSent) res.writeHead(502);
    res.end('PHP error: ' + err.message);
  });

  http.createServer((req, res) => {
    proxy.web(req, res);
  }).listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Flex PHP Site running on port ${PORT}`);
    console.log(`   PHP backend on port ${PHP_PORT}`);
    console.log(`   Compression: gzip / brotli enabled`);
  });
});

process.on('SIGTERM', () => { php.kill(); process.exit(0); });
process.on('SIGINT',  () => { php.kill(); process.exit(0); });
