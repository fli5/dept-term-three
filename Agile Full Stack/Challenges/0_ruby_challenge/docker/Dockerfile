# 使用官方 Ruby 镜像
FROM ruby:3.3

# 设置工作目录
WORKDIR /app

# 安装系统依赖
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

# 复制 Gemfile 并安装 Gems
COPY Gemfile* ./
RUN gem install bundler && bundle install --without development test

# 复制项目文件
COPY . .

# 设置可执行权限
RUN chmod +x bin/my_project

# 默认命令
CMD ["bin/app"]
