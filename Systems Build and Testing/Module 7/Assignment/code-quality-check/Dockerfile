# Stage 1 - Build the StoryBook
FROM node:20-alpine AS building

# Set up the workdir
WORKDIR /feng_li_ui_garden_build_checks

# Copy the package.json to install all necessary dependencies
COPY package.json ./

# Install all dependencies
RUN npm install

# Copy all source code to prepare for building artifact
COPY . .

RUN npm run eslint-lint:fix
RUN npm run prettier-lint
RUN npm test
# Execute build command
RUN npm run build-storybook

# Stage 2 - Deploy the StoryBook
FROM nginx:alpine AS production

WORKDIR /feng_li_ui_garden_build_checks

# Clean up all files under the html direcotry
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Storybook static files
COPY --from=building /feng_li_ui_garden_build_checks/storybook-static /usr/share/nginx/html

# Expose the default port of Nginx for the Container
EXPOSE 80

# Let Nginx run in foreground mode and keep the container alive
CMD ["nginx", "-g", "daemon off;"]
