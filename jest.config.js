module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts', '**/__tests__/**/*.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  setupFiles: ['./jest.setup.js'],
  testTimeout: 30000, // Aumentar o timeout para 30 segundos
};
