import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import { authController } from "../../controllers/index.js";
import { validateRequestSchema, tryCatch, isAuthorized } from "../../middlewares/index.js";
import { registerValidateChainMethod, loginValidateChainMethod } from "../../validations/auth.validation.js";
import { ifUserExist, ifUserNotExist } from "../../scripts/user/userChecking.script.js";
import { UserService } from "../../services/index.js";

/**
 * Router for authentication-related endpoints.
 * @type {Router}
 */
const authRouter = Router();

if (process.env.NODE_ENV !== "test") {
    authRouter.use(morgan("combined"));
}

/**
 * Route for user registration.
 * Accessible to all users.
 * @name POST /api/auth/register
 * @function
 * @memberof authRouter
 * @inner
 */
authRouter.post(
    "/register",
    registerValidateChainMethod,
    validateRequestSchema,
    ifUserExist(UserService),
    tryCatch(authController.register.bind(authController)),
);

/**
 * Route for user login.
 * Accessible to all users.
 * @name POST /api/auth/login
 * @function
 * @memberof authRouter
 * @inner
 */
authRouter.post(
    "/login",
    loginValidateChainMethod,
    validateRequestSchema,
    ifUserNotExist(UserService),
    tryCatch(authController.login.bind(authController)),
);

export default authRouter;
