import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// runs before every test
beforeEach(() => {
  console.warn('Setting up test environment');
  jest.clearAllMocks();
});

// runs after each test
afterEach(() => {
  console.warn('Cleaning up after each test');
  cleanup();
  jest.clearAllMocks();
});

// runs once before all tests
beforeAll(() => {
  console.warn('Initialize test environment before all tests');
});

// runs once after all tests
afterAll(() => {
  console.warn('Cleaning up after all tests');
});
