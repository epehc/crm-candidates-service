/*   // Mock the database to use an in-memory SQLite database
  jest.mock('./src/database/db', () => {
    const { Sequelize } = require('sequelize');
    // Use a connection string that avoids deprecation warnings
    const sequelize = new Sequelize('sqlite::memory:', { logging: false });
    return { sequelize };
  });

  // Mock the logger to prevent real logging during tests
  jest.mock('./src/utils/logger', () => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn()
  }));

  // Mock the authentication middleware
  jest.mock('@epehc/sharedutilities/middlewares/authMiddleware', () => ({
    authenticateJWT: (req, res, next) => next()
  }));

  // Mock the authorization middleware
  jest.mock('@epehc/sharedutilities/middlewares/authorize', () => ({
    authorize: () => (req, res, next) => next()
  }));
 */