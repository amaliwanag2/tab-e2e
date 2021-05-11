module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jestSetup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.yalc/', '/.git/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/', '/.yalc/'],
}
