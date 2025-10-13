# 使用官方的 Node.js 镜像作为构建阶段的基础镜像
FROM node:22 AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果有的话）
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件
COPY . .

# 构建 Vite 项目
RUN npm run build

# 使用官方的 Nginx 镜像作为生产阶段的基础镜像
FROM nginx:stable-alpine

# 复制构建输出到 Nginx 的默认静态文件目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 拷贝启动脚本（生成 env.js）
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# 声明一个可覆盖的环境变量（默认空）
ENV API_URL=""

EXPOSE 80
CMD ["/entrypoint.sh"]
