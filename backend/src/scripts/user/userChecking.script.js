import { response, isExist } from "../../middlewares/index.js";

/**
 * Middleware to check if a user with the provided login already exists.
 * @param {Class} Service - The service class to use for user operations.
 * @returns {Function} Middleware function.
 */
export const ifUserExist = (Service) => async (req, res, next) => {
    const isEmail = await isExist(Service, "email", req.body.email);
    if (isEmail) {
        return response(409, { message: "User with this email already exists" }, res);
    }
    next();
};

/**
 * Middleware to check if a user with the provided login does not exist.
 * @param {Class} Service - The service class to use for user operations.
 * @returns {Function} Middleware function.
 */
export const ifUserNotExist = (Service) => async (req, res, next) => {
    const isEmail = await isExist(Service, "email", req.body.email);
    if (!isEmail) {
        return response(404, { message: "User with this email not exist" }, res);
    }
    next();
};
