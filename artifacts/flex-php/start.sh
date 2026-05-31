#!/bin/bash
PORT=${PORT:-3002}
echo "🚀 Flex PHP Server starting on port $PORT"
php -S 0.0.0.0:$PORT router.php
