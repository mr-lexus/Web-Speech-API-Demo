/** @type {import('jest').Config} */
const { pathsToModuleNameMapper } = require('ts-jest')
const tsconfig = require('./tsconfig.json')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'vue'],
  transform: {
    '^.+\\.(vue)$': '@vue/vue3-jest',
    '^.+\.(ts|tsx)$': [
      'ts-jest',
      { tsconfig: '<rootDir>/tsconfig.json' }
    ]
  },
  transformIgnorePatterns: [
    'node_modules/(?!(vue-i18n)/)',
  ],
  moduleNameMapper: {
    ...(tsconfig.compilerOptions && tsconfig.compilerOptions.paths
      ? pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/' })
      : {}),
    // Force CJS build of VTU to avoid browser UMD requiring global Vue
    '^@vue/test-utils$': '<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js',
    // Mock vue-i18n to avoid ES module issues
    '^vue-i18n$': '<rootDir>/test/__mocks__/vue-i18n.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^.+\\.(svg|png|jpg|jpeg|gif)$': 'jest-transform-stub'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,vue}',
    '!src/main.ts',
    '!src/app/styles/**',
    '!src/**/__tests__/**'
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}