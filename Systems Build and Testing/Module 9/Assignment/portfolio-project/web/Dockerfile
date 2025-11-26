# Stage 1 - Build the website
FROM node:20-alpine AS building

# Set up the workdir
WORKDIR /feng_li_final_site

# Copy all source code to prepare for building artifact
COPY . .

# Install all dependencies
RUN npm install

# Execute build command
RUN npm run build

# Stage 2 - Deploy the website with Nginx
FROM nginx:alpine AS production

WORKDIR /feng_li_final_site

# Clean up all files under the html direcotry
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Storybook static files
COPY --from=building /feng_li_final_site/build /usr/share/nginx/html

# Expose the default port of Nginx for the Container
EXPOSE 80

# Let Nginx run in foreground mode and keep the container alive
CMD ["nginx", "-g", "daemon off;"]
