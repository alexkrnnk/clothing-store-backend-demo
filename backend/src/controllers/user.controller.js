import { UserService } from "../services/index.js";

import { hashPassword } from "../middlewares/index.js";

/**
 * Controller class for user-related operations.
 * @class
 */
export class UserController {
    constructor() {
        this.service = new UserService();
    }

    /**
     * Retrieves all users.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectAll(req, res) {
        const result = await this.service.selectAll();
        return { code: result.code, values: result.values };
    }

    /**
     * Retrieves a user by their ID.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectById(req, res) {
        const { id } = req.params;
        const result = await this.service.selectById(id);
        return { code: result.code, values: result.values };
    }

    /**
     * Retrieves a user by their email.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectByEmail(req, res) {
        const { body } = req;
        const email = body.email;
        const result = await this.service.selectByEmail(email);
        return { code: result.code, values: result.values };
    }

    /**
     * Creates a new user.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async create(req, res) {
        const { body } = req;
        const encryptedPass = await hashPassword(body.password);
        const data = {
            email: body.email,
            password: encryptedPass,
            name: body.name,
            lastname: body.lastname,
            phone: body.phone,
            role: body.role,
        };

        const result = await this.service.create(data);
        return { code: result.code, values: result.values };
    }

    /**
     * Updates an existing user.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async update(req, res) {
        const { id } = req.params;
        const newData = req.body;
        const result = await this.service.update(id, newData);
        return { code: result.code, values: result.values };
    }

    /**
     * Deletes a user by their ID.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async delete(req, res) {
        const { id } = req.params;
        const result = await this.service.delete(id);
        return { code: result.code, values: result.values };
    }
}

const userController = new UserController();

export default userController;
