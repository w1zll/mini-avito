/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // нужен для тестирования компонентов React
  moduleNameMapper: {
    '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@/features/(.*)$': '<rootDir>/src/features/$1',
    '^@/entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // файл для глобальных настроек
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};
