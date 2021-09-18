/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['node_modules', '<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/testing/setup-global-fetch.js'],
  globalSetup: '<rootDir>/testing/setup-env.js',
  transform: {
    '^.+\\.(js|ts)$': 'ts-jest',
  },
}
