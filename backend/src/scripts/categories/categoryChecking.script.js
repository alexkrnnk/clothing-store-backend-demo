import { response, isExist } from "../../middlewares/index.js";

/**
 * Middleware to check if a user with the provided login already exists.
 * @param {Class} Service - The service class to use for user operations.
 * @returns {Function} Middleware function.
 */
export const ifCategoryExist = (Service) => async (req, res, next) => {
    const isTitle = await isExist(Service, "titleENG", req.body.titleENG);
    if (isTitle) {
        return response(409, { message: "Category with this titleENG already exists" }, res);
    }
    const isTitle1 = await isExist(Service, "titleUA", req.body.titleUA);
    if (isTitle1) {
        return response(409, { message: "Category with this titleUA already exists" }, res);
    }
    next();
};

/**
 * Middleware to check if a user with the provided login does not exist.
 * @param {Class} Service - The service class to use for user operations.
 * @returns {Function} Middleware function.
 */
export const ifCategoryNotExist = (Service) => async (req, res, next) => {
    const isTitle = await isExist(Service, "titleENG", req.body.titleENG);
    if (!isTitle) {
        return response(404, { message: "Category with this titleENG already exists" }, res);
    }
    const isTitle1 = await isExist(Service, "titleUA", req.body.titleUA);
    if (!isTitle1) {
        return response(404, { message: "Category with this titleUA already exists" }, res);
    }
    next();
};
