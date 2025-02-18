/* jest.resetModules();

// Mock the database to use an in-memory SQLite database
const { Sequelize } = require('sequelize');
jest.mock('./src/database/db', () => {
  // Make sure the module path exactly matches your import in models
  const sequelize = new Sequelize('sqlite::memory:', { logging: false });
  return { sequelize };
});

// Mock the logger
jest.mock('./src/utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn()
}));

// Bypass auth and authorization middlewares
jest.mock('@epehc/sharedutilities/middlewares/authMiddleware', () => ({
  authenticateJWT: (req, res, next) => next()
}));
jest.mock('@epehc/sharedutilities/middlewares/authorize', () => ({
  authorize: () => (req, res, next) => next()
})); */