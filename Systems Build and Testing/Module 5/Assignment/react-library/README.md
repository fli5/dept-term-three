# Create a StoryBook for React Library
- storybook/react-webpack5: ^9.1.10
- jest: ^30.2.0
- react: ^18.3.1
- react-dom: ^18.3.1
- typescript: ^5.9.3
##  1. Initialize a package.json
`npm init`
---

## 2. Install the dependencies for React and TypeScript
```bash
    npm i react typescript @types/react tslib --save-dev
```
### Set up Dependency management
```json
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
```
- `peerDependencies`: The dependencies provided by the user of the library
- `devDependencies`: The dependencies you need for development and test
- `dependencies`: The dependencies provided by the developer of the library
---

## 3. Create a tsconfig.json to configure the TypeScript 
```bash
    npx tsc -init
```
### Config the tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

---

## 4. Create the project skeleton
- `Button.tests.tsx`: Verify the Button component works as expected in different scenarios.
- `Button.tsx`: Define the Button component’s structure, behavior, and appearance.
- `Button.types`.tsx: Define TypeScript interfaces or types for the Button component.
- `Index.ts`: Provide a single entry point for importing the Button component and its types.
- `Button.stories.tsx`: Provide visual examples of the Button for development and documentation.
---
## 5. Install the Rollup plugin to bundle and package libraries
```bash
    npm install rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-typescript rollup-plugin-peer-deps-external @rollup/plugin-terser rollup-plugin-dts --save-dev
```
### Customize a rollup.config.js
```javascript
export default [
    {
        input: "src/Index.ts",
        output: [
            //creating separate files specified by the main and module entries in the package.json
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            terser(),
        ],
        external: ["react", "react-dom"],
    },
    {
        input: "src/Index.ts",
        output: [{ file: "dist/types.d.ts", format: "es" }],
        //generates a type declaration file (types.d.ts) using the dts plugin
        plugins: [dts.default()],
    },
];
```
### Set up the package.json for Rollup
```json
 "main": "dist/cjs/index.js",
 "module": "dist/esm/index.js",
 "types": "dist/index.d.ts", 

 "scripts": {
    "rollup": "rollup -c --bundleConfigAsCjs",
 }
```
- `main`: "dist/cjs/index.js": Specifies the CommonJS entry point
- `module`: "dist/esm/index.js": Indicates the ECMAScript Module entry point
- `types`: "dist/index.d.ts": Points to the TypeScript type declaration file
- `scripts`: {"rollup": "rollup -c --bundleConfigAsCjs", ...}: Defines a script command

---
### Adding CSS support in Rollup
```bash
    npm install rollup-plugin-postcss --save-dev
```
### Build the Library
```bash
  npm run rollup
```
---
## 6. Install the styled-components library
```bash
  npm install react@18.3.1 react-dom@18.3.1
```
```bash
  npm install styled-components
```

---
## 7. Add Jest and React Testing Library
```bash
  npm install @testing-library/react jest @types/jest jest-environment-jsdom --save-dev
```

Install Babel and related plugins to handle JSX transformations for Jest
```bash
  npm install @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-jest --save-dev
```

Install identity-obj-proxy to allow Jest to treat all types of imports (CSS, LESS, and SCSS) as generic objects
```bash
  npm install identity-obj-proxy -save-dev
```
### Set up setupTests.ts
```typescript
// runs before every test
beforeEach(() => {
  console.log("Setting up test environment")
  jest.clearAllMocks();
});

// runs after each test
afterEach(() => {
console.log("Cleaning up after each test")
cleanup();
jest.clearAllMocks();

});

// runs once before all tests
beforeAll(() => {
console.log("Initialize test environment before all tests");
});

// runs once after all tests
afterAll(() => {
console.log("Cleaning up after all tests");
});

```
### Set up jest.config.js
```javascript
module.exports = {
    testEnvironment: "jsdom",
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        // Add files ending with .tests.tsx|ts|js
        "**/?(*.)+(spec|tests|test).+(ts|tsx|js)"
    ],
    moduleNameMapper: {
        ".(css|less|scss)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["./src/setupTests.ts"],
};
```
### Set up babel.config.js
```javascript
module.exports = {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
 };
```
### Set up package.json
```json
"scripts": {
   "test": "jest",
}
```
### Run tests
- Run all tests
  `npm run test`

- Run only tests for the `Button component`
  `npm test -- Button`

- Run only changed files since `last commit`
```bash
  npx jest --onlyChanged
```

- Run only the specific test file
```bash
  npx jest src/components/Button/Button.tests.tsx
```

- Run only tests with name containing `"disabled"`
```bash
  npx jest -t "disabled"
```

- Watch the test changes and run all tests
```bash
  npx jest --watch
```

- Run all tests and create coverage reports.
```bash
  npx jest --coverage
```
```text
This creates a /coverage folder with a full HTML report:
• Statements – how many lines of code are executed
• Branches – how many if/else paths are tested
• Functions – how many functions are called
• Lines – total code lines covered
```

---
## 8. Setting up Storybook
```bash
    npx sb init --builder webpack5
```
### Build StoryBook
Static the StoryBook

```bash
    npm run build-storybook
```
### Run StoryBook
storybook dev -p 6006
```bash
  npm run storybook
```
---
## 9. Containerized Deployment
### Create a Dockerfile
```dockerfile
# Stage 1 - Build the StoryBook
FROM node:20-alpine AS building

# Set up the workdir
WORKDIR /feng_li_ui_garden

# Copy the package.json to install all necessary dependencies
COPY package.json ./

# Install all dependencies
RUN npm install

# Copy all source code to prepare for building artifact
COPY . .

# Execute build command
RUN npm run build-storybook

# Stage 2 - Deploy the StoryBook
FROM nginx:alpine AS production

WORKDIR /feng_li_ui_garden

# Clean up all files under the html direcotry
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Storybook static files
COPY --from=building /feng_li_ui_garden/storybook-static /usr/share/nginx/html

# Expose the default port of Nginx for the Container
EXPOSE 80

# Let Nginx run in foreground mode and keep the container alive
CMD ["nginx", "-g", "daemon off;"]

```
### Remove Docker Container
```bash
  docker rm feng_li_coding_assignment12
```
### Remove Docker Image
```bash
  docker image rm feng_li_coding_assignment12
```
### Build Docker Image 
```bash
  docker build -t feng_li_coding_assignment12 .
```

### Run Docker Container
```bash
  docker run -d -p 8083:80 --name feng_li_coding_assignment12 feng_li_coding_assignment12 
```
### Stop Docker Continaer
```bash
  docker stop feng_li_coding_assignment12
```
### Start Docker Continaer
```bash
  docker start feng_li_coding_assignment12
```
## 10. http://localhost:8083

