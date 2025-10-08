# 1️⃣ 构建阶段
FROM node:20-alpine AS build

# 设置工作目录
WORKDIR /lastName_firstName_ui_garden

# 拷贝 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 拷贝源代码
COPY . .

# 构建 Storybook 静态站
RUN npm run build-storybook

# 2️⃣ 运行阶段
FROM nginx:alpine

# 设置工作目录
WORKDIR /lastName_firstName_ui_garden

# 删除 Nginx 默认网站
RUN rm -rf /usr/share/nginx/html/*

# 拷贝构建好的 Storybook 静态文件
COPY --from=build /lastName_firstName_ui_garden/storybook-static /usr/share/nginx/html

# 暴露端口 8083
EXPOSE 8083

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
