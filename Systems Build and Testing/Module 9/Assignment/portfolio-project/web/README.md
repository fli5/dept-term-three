# Building a Portfolio Website

- react: ^18.3.1
- react-dom: ^18.3.1
- typescript: ^4.9.5
- eslint: ^9.38.0
- sass: ^1.94.2,
- lucide-react: ^0.554.0
- prettier: ^3.6.2
- @fli5/react-library: beta
- eslint": ^9.39.1
- tailwind: ^3.4.18
---
## Publish React Library
### 1. Configurate the publish in `package.json`
```json
{
  "name": "@fli5/react-library",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/fli5"
  }
}
```
### 2. Set up the `.npmrc` file for the current user
```text
@fli5:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken={github_token}
```
### 3. Build and package the library
```bash
npm run rollup
```
### 4. Publish the library to Github
```bash
$env:GITHUB_TOKEN="{ghp_xxxxxxxxxxxxx}"
npm publish
```
---
## Build Portfolio Website
### 1. Create a React App
```bash
npx create-react-app web --template typescript
```
### 2. Install the Prettier
```bash
npm install prettier --save-dev
```
### 3. Add Prettier Configuration file (.prettierrc.json)

```
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": []
}
```
### 4. Add the Prettier ignore file to exclude files from being formatted
(.prettierignore), for example:

```
node_modules
```
### 5. Add the scripts in the package.json

```
"scripts": {
    "prettier-lint": "prettier --check .",
    "prettier-format": "prettier --write .",
}
```
---
### 6. Upgrade the eslint to 9.x
```bash
npm install --save-dev eslint@^9.39.0 @eslint/js@^9.39.1 eslint-plugin-react@^7.37.5 @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier
```
### 7. Remove these lines from `package.json`
Avoid the conflict caused by eslint 9.x
```json
"eslintConfig": {
  "extends": ["react-app"]
}
```
### 8. Configure the ESlint (eslint.config.mjs)
```bash
npm init @eslint/config
```
### 9. Add the scripts in the package.json

```
  "scripts": {
    "eslint-lint": "eslint .",
    "eslint-lint:fix": "eslint --fix"
  }
```
---
### 11 Install the sass and tailwind pakcage
```bash
npm install sass
npm install tailwindcss --save-dev
```
### 12 Install icons package
```bash
npm install lucide-react
```

### 14 Add the react library dependency in `package.json`
```json
  "dependencies": {
    "@fli5/react-library": "beta",
  }
```
---
### 15 Create 5 components in src/components
```text
- BasicInformation
  * BasicInformation.tsx
  * BasicInformation.types.tsx
  * BasicInformation.scss
- DeveloperSetup
  * DeveloperSetup.tsx
  * DeveloperSetup.types.tsx
  * DeveloperSetup.scss
- Resources
  * Resoures.tsx
  * Resource.types.tsx
  * Resource.scss
- Skills
  * Skills.tsx
  * Skills.types.tsx
  * Skills.scss
- Work
  * Work.tsx
  * Work.types.tsx
  * Work.scss
```
### 15 Create the App compontent with 5 components
---

## Containerized Deployment

### 1. Create a Dockerfile

```dockerfile
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
```

### Remove Docker Container

```bash
docker rm feng_li_coding_assignment14
```

### Remove Docker Image

```bash
docker image rm feng_li_coding_assignment14
```

### Build Docker Image

```bash
docker build -t feng_li_coding_assignment14 .
```

### Run Docker Container

```bash
docker run -d -p 5575:80 --name feng_li_coding_assignment14 feng_li_coding_assignment14
```

### Stop Docker Continaer

```bash
docker stop feng_li_coding_assignment14
```

### Start Docker Continaer

```bash
docker start feng_li_coding_assignment14
```

## 10. http://localhost:5575