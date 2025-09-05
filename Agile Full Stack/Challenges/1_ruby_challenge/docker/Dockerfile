FROM ruby:3.3

WORKDIR /app

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

COPY Gemfile* ./
RUN gem install bundler && bundle install --without development test

COPY . .

CMD ["irb"]