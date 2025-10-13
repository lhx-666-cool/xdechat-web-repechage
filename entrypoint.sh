#!/bin/sh
set -e

# 运行时生成 /usr/share/nginx/html/env.js
cat >/usr/share/nginx/html/env.js <<EOF
window.__ENV__ = { API_URL: "${API_URL}" };
EOF

# 启动 nginx（前台）
exec nginx -g 'daemon off;'