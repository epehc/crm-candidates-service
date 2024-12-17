import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

/**
 * Load environment variables from .env file
 */
dotenv.config();

/**
 * Initialize a new Sequelize instance
 *
 * @type {Sequelize}
 * @param {string} process.env.DB_DATABASE - The name of the database
 * @param {string} process.env.DB_USERNAME - The username for the database
 * @param {string} process.env.DB_PASSWORD - The password for the database
 * @param {object} options - Additional options for Sequelize
 * @param {string} options.host - The host of the database
 * @param {string} options.dialect - The dialect of the database (e.g., postgres)
 * @param {number} options.port - The port number for the database
 */
const sequelize = new Sequelize(
    process.env.DB_DATABASE!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD!,
    {
    host: process.env.DB_HOST!,
    dialect: "postgres",
    port: Number(process.env.DB_PORT),
    }
);

export default sequelize;