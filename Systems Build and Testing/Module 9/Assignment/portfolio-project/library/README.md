# Do Quality Assurance Task for UI Library

- storybook/react-webpack5: ^9.1.10
- jest: ^30.2.0
- react: ^18.3.1
- react-dom: ^18.3.1
- typescript: ^5.9.3
- eslint: ^9.38.0
- husky: ^9.1.7
- prettier: ^3.6.2
---

## Install and set up the Husky

### 1. Install the Husky

```bash
    npm install husky --save-dev
```

### 2. Initialize the Husky

Create a .husky directory at the root with a pre-commit hook file

```bash
    npx husky init
```

### 3. Add a prepare script for automatic init husky

Automatically called when executing the `npm install`

```
"scripts": {
    "prepare": "husky install",
}
```

---

## Install and set up the ESLint

### 1. Install the ESLint

```bash
    npm install eslint --save-dev
```

### 2. Configure the ESlint (eslint.config.mjs)

```bash
    npm init @eslint/config
```

### 3. Add the scripts in the package.json

```
  "scripts": {
    "eslint-lint": "eslint .",
    "eslint-lint:fix": "eslint --fix"
  }
```

---

## Install and set up the Prettier

### 1. Install the Prettier

```bash
    npm install prettier --save-dev
```

### 2. Add Prettier Configuration file (.prettierrc.json)

```
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": []
}
```

### 3. Add the Prettier ignore file to exclude files from being formatted

(.prettierignore), for example:

```
node_modules
```

### 4. Add the scripts in the package.json

```
"scripts": {
    "prettier-lint": "prettier --check .",
    "prettier-format": "prettier --write .",
}
```

---

## Install and set up the lint-staged

Lint-staged is a tool to check only the files you have modified before committing

### 1. Install the lint-staged

```bash
    npm install lint-staged --save-dev
```

### 2. Configure the lint-staged (.lintstagedrc.json)

```
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix"],
  "*.{json,css,scss,md,js,jsx,ts,tsx}": ["prettier --write"]
}
```

---

## Configure Husky Hooks

Add lint-staged and npm test to `pre-commit` file for code checking and testing

```
echo '>>Run ESLint Check and Prettier Check...\n'
lint-staged --verbose
echo '>>>Run testing... \n'
npm test
```

---

## Set up GitHub Workflows

### 1. Add ci.yml into .github/workflows folders

```yaml
name: CI/CD Pipeline

# when to execute this workflow
on:
  pull_request:
  push:
    branches: [main]
# the job list included in the workflow
jobs:
  check-task:
    name: Lint & Format
    # OS that runs on
    runs-on: ubuntu-latest

    # Which node version should be covered
    strategy:
      matrix:
        node-version: [18.x, 20.x, 22.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      # named a step
      - name: Set up Node.js ${{ matrix.node-version }}
        # use existing action in GitHub
        uses: actions/setup-node@v3
        # Pass some parameter
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        # Execute a command present in the Env
        run: npm ci

      - name: Run ESLint check
        run: npm run eslint-lint:fix

      - name: Run Prettier Check
        run: npm run prettier-format

  test-task:
    name: Run Tests
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x, 22.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --coverage
```

### 2. Commit the yaml to GitHub

---

## Containerized Deployment

### 1. Create a Dockerfile

```dockerfile
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

```

### Remove Docker Container

```bash
  docker rm feng_li_coding_assignment13
```

### Remove Docker Image

```bash
  docker image rm feng_li_coding_assignment13
```

### Build Docker Image

```bash
  docker build -t feng_li_coding_assignment13 .
```

### Run Docker Container

```bash
  docker run -d -p 8081:80 --name feng_li_coding_assignment13 feng_li_coding_assignment13
```

### Stop Docker Continaer

```bash
  docker stop feng_li_coding_assignment13
```

### Start Docker Continaer

```bash
  docker start feng_li_coding_assignment13
```

## 10. http://localhost:8081
