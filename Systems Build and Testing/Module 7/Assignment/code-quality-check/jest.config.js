//jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    // Add files ending with .tests.tsx|ts|js
    '**/?(*.)+(spec|tests|test).+(ts|tsx|js)',
  ],
  moduleNameMapper: {
    '.(css|less|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./src/setupTests.ts'],
};
