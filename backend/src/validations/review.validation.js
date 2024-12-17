import { body } from "express-validator";

const checkReviewOnCreate = [
    body("text")
        .exists({ checkFalsy: true })
        .withMessage("Text must be provided")
        .isString()
        .withMessage("Text must be a string")
        .isLength({ min: 1 })
        .withMessage("Password must be at least 1 characters long"),

    body("rate")
        .exists({ checkFalsy: true })
        .withMessage("Rate must be provided")
        .isInt()
        .withMessage("Rate must be a number"),
];

const checkReviewOnUpdate = [
    body("text")
        .optional()
        .isString()
        .withMessage("Text must be a string")
        .isLength({ min: 1 })
        .withMessage("Password must be at least 1 characters long"),

    body("rate").optional().isInt().withMessage("Rate must be a integer"),
];

export { checkReviewOnCreate, checkReviewOnUpdate };
