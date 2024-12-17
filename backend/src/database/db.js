import { Sequelize } from "sequelize";
import logger from "../config/logger.js";
import "dotenv/config";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_DIALECT } = process.env;

/**
 * Sequelize instance for connecting to the database.
 * @type {Sequelize}
 */
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: 3306,
    dialect: "mysql",
});

/**
 * Function to connect to the database.
 * @returns {Promise<void>}
 */
async function connectToDB() {
    try {
        await sequelize.authenticate();
        logger.info("Connection to the database has been established successfully.");
    } catch (error) {
        logger.error(`Unable to connect to the database: ${error.message}`);
    }
}

/**
 * Function to disconnect from the database.
 * @returns {Promise<void>}
 */
async function disconnectFromDB() {
    try {
        await sequelize.close();
        logger.info("Connection to the database has been closed successfully.");
    } catch (error) {
        logger.error(`Error closing the connection: ${error.message}`);
    }
}

/**
 * Function to synchronize models with the database.
 * @returns {Promise<void>}
 */
async function syncModels() {
    try {
        await sequelize.sync({ alter: true });
        logger.info("Models have been synchronized successfully.");
    } catch (error) {
        logger.error(`Error synchronizing models: ${error.message}`);
    }
}

export { connectToDB, disconnectFromDB, syncModels };
export default sequelize;
