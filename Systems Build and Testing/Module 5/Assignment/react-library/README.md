##  1. init a package.json
`npm init`
## 2. install the dependencies for React and TypeScript
```bash
    npm i react typescript @types/react tslib --save-dev
```
## 3. To configure the TypeScript options, we need to create a tsconfig.json file.
```bash
    npx tsc -init
```
## 4. Config the tsconfig.json
```text
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
## 5. create the project skeleton
## 6. use Rollup to simplify the process of bundling and packaging our React component library.
```bash
    npm install rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-typescript rollup-plugin-peer-deps-external @rollup/plugin-terser rollup-plugin-dts --save-dev
```
## 7. To customize Rollup’s bundling and processing behavior for our project, create a rollup.config.js
set up Rollup is to add the following entries to the package.json file:
```
 "main": "dist/cjs/index.js",
 "module": "dist/esm/index.js",
 "types": "dist/index.d.ts", 
 …
 "scripts": {
    "rollup": "rollup -c --bundleConfigAsCjs",
    ...
 }
```
`main`: "dist/cjs/index.js": Specifies the CommonJS entry point for the library, typically used by Node.js environments
`module`: "dist/esm/index.js": Indicates the ECMAScript Module entry point for modern JavaScript environments, providing an optimized library version for bundlers that support ES modules
`types`: "dist/index.d.ts": Points to the TypeScript type declaration file, providing type information for the library
`scripts`: {"rollup": "rollup -c --bundleConfigAsCjs", ...}: Defines a script command that runs the Rollup bundler using a configuration file (-c) and an additional flag (--bundleConfigAsCjs) suggesting bundling for CommonJS. This script is used for generating the CommonJS bundle of the library
## 8. Adding CSS support in Rollup for component styling
```bash
    npm install rollup-plugin-postcss --save-dev
```
## Installing styled-components
```bash
npm install react@18.3.1 react-dom@18.3.1
npm install styled-components

```
## 9. Add Jest and React Testing Library
```bash
npm install @testing-library/react jest @types/jest jest-environment-jsdom --save-dev
npm install @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-jest --save-dev

```
### We also install identity-obj-proxy, which allows Jest to treat all types of imports (CSS, LESS, and SCSS) as generic objects
```bash
npm install identity-obj-proxy -save-dev

```
## 10. Set up jest.config.js and babel.config.js configuration files
```text
/ jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    ".(css|less|scss)$": "identity-obj-proxy",
  },
};

// babel.config.js
module.exports = {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
 };
 
 // package.json
 "scripts": {
   "test": "jest",
}
```


## 9. Setting up Storybook
```bash
    npx sb init --builder webpack5
```
## 10 Dependency management
```text
We currently have all the dependencies under the devDependencies in package.json. To manage the dependencies better, we want to move the following dependencies into peerDependencies:
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
```
## Build the Library
```bash
  npm run rollup
```
## Run StoryBook
```bash
npm run storybook
```
## Run the test
```bash
  npm run test
```
## Create a Dockerfile

## Build Docker Image 
```bash
docker build -t lastName_firstName_coding_assignment12 .

```
## Run Docker Container
```bash
docker run -p 8083:8083 lastName_firstName_coding_assignment12

```

