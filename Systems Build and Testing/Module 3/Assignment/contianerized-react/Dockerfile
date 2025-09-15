FROM node:20-alpine

# Workdir as required
WORKDIR /feng_li_site

# Copy dependency files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose dev server port
EXPOSE 7775

# Start React dev server on port 7775
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "7775"]

