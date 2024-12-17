import { response, isExist } from "../../middlewares/index.js";

/**
 * Middleware to check if a user with the provided login already exists.
 * @param {Class} Service - The service class to use for user operations.
 * @returns {Function} Middleware function.
 */
export const ifProductExist = (Service) => async (req, res, next) => {
    const isProduct = await isExist(Service, "article", req.body.article);
    if (isProduct) {
        return response(409, { message: "Product with this article already exists" }, res);
    }
    next();
};

/**
 * Middleware to check if a user with the provided login does not exist.
 * @param {Class} Service - The service class to use for user operations.
 * @returns {Function} Middleware function.
 */
export const ifProductNotExist = (Service) => async (req, res, next) => {
    const isProduct = await isExist(Service, "article", req.body.article);
    if (!isProduct) {
        return response(404, { message: "Product with this article not exist" }, res);
    }
    next();
};
