import logger from "../config/logger.js";
import { User } from "../models/index.js";

export default class UserService {
    /**
     * Retrieves all users
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectAll() {
        try {
            const user = await User.findAll({
                attributes: { exclude: ["password"] },
            });
            if (user) {
                return { code: 200, values: user };
            }
            return { code: 404, values: "users_not_found" };
        } catch (error) {
            logger.error(`Error selecting users: ${error.message}`);
            return { code: 500, values: `Error selecting users: ${error}` };
        }
    }

    /**
     * Retrieves a user by id
     * @param {string} id - The user's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectById(id) {
        try {
            const user = await User.findByPk(id, {
                attributes: { exclude: ["password"] },
            });
            if (user) {
                return { code: 200, values: user };
            }
            return { code: 404, values: "user_not_found" };
        } catch (error) {
            logger.error(`Error selecting user: ${error.message}`);
            return { code: 500, values: `Error selecting user: ${error}` };
        }
    }

    /**
     * Retrieves a user by email
     * @param {string} email - The user's email
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectByEmail(email) {
        try {
            const user = await User.findOne({
                where: {
                    email,
                },
            });
            if (user) {
                return { code: 200, values: user };
            }
            return { code: 404, values: { status: "user_not_found" } };
        } catch (error) {
            logger.error(`Error selecting user by email: ${error.message}`);
            return { code: 500, values: "Error fetching user by email" };
        }
    }
    /**
     * Creates a new user
     * @param {Object} data - Data for creating the user
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async create(data) {
        try {
            const newUser = await User.create({
                email: data.email,
                password: data.password,
                name: data.name,
                lastname: data.lastname,
                phone: data.phone,
                role: data.role,
            });

            return { code: 200, values: "User created successfully" };
        } catch (error) {
            logger.error(`Error creating user: ${error.message}`);
            return { code: 500, values: `Error creating user: ${error}` };
        }
    }

    /**
     * Update a user by id
     * @param {string} id - Data for updating the user
     * @param {Object} newData - Data for updating the user
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async update(id, newData) {
        try {
            const user = await User.findByPk(id);

            if (!user) return { code: 404, values: "User not found" };

            // Update the user only with the data that comes in newData
            const currentUserData = user.set(newData);
            const result = await currentUserData.save();

            return { code: 200, values: `User updated successfully` };
        } catch (error) {
            logger.error(`Error updating user: ${error.message}`);
            return { code: 400, values: `Error updating user: ${error}` };
        }
    }

    /**
     * Delete a user by id
     * @param {string} id - The user's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async delete(id) {
        try {
            const deletedRowCount = await User.destroy({
                where: {
                    id: id,
                },
            });
            if (deletedRowCount > 0) {
                return { code: 200, values: `Deleted ${deletedRowCount} users with ID ${id}` };
            } else {
                return { code: 400, values: `User with ID ${id} not found or already deleted.` };
            }
        } catch (error) {
            logger.error(`Error when deleting a user by ID: ${error.message}`);
            return { code: 400, values: `Error when deleting a user by ID: ${error}` };
        }
    }

    /**
     * Checks if a user exists
     * @param {string} field - The field to search for the user
     * @param {string} value - The value of the field to search for
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async isExist(field, value) {
        try {
            const whereClause = {};
            whereClause[field] = value;
            const user = await User.findOne({
                where: whereClause,
            });
            if (user) {
                return user;
            }
        } catch (error) {
            logger.error(`Error fetching user by ${field}: ${error.message}`);
            return { code: 500, values: `Error fetching user by ${field}` };
        }
    }
}
