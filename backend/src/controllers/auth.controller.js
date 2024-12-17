import jwt from "jsonwebtoken";
import "dotenv/config";

import { UserService } from "../services/index.js";
import { UserRolesConst, hashPassword } from "../middlewares/index.js";

/**
 * Controller class for user authentication operations.
 * @class
 */
export class AuthController {
    constructor() {
        this.service = new UserService();
    }

    /**
     * Registers a new user.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async register(req, res) {
        const { body } = req;
        const encryptedPass = await hashPassword(body.password);
        const userData = {
            email: body.email,
            password: encryptedPass,
            name: body.name,
            lastname: body.lastname,
            phone: body.phone,
            role: UserRolesConst[2],
        };
        const result = await this.service.create(userData);
        return { code: result.code, values: result.values };
    }

    /**
     * Log in a user.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async login(req, res) {
        const { body } = req;
        const userResponse = await this.service.selectByEmail(body.email);
        if (userResponse.code != 200) {
            return { code: user.code, values: user.values };
        }
        const user = userResponse.values;
        const password = await hashPassword(body.password);
        if (password !== user.password) {
            return { code: 400, values: "Password do not match" };
        }
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" },
        );
        const data = {
            userData: {
                userId: user.id,
                email: user.email,
                role: user.role,
            },
            token,
        };
        return { code: 200, values: data };
    }
}

const authController = new AuthController();

export default authController;
