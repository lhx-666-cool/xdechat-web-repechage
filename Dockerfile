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

# 复制自定义的 Nginx 配置文件（如果有的话）
# COPY nginx.conf /etc/nginx/nginx.conf

# 暴露 Nginx 默认的 HTTP 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
