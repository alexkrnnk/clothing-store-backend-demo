import { body } from "express-validator";

const checkCategoryOnCreate = [
    body("titleENG")
        .exists({ checkFalsy: true })
        .withMessage("English title must be provided")
        .isString()
        .withMessage("English title must be a string")
        .isLength({ min: 1 })
        .withMessage("English title must be at least 1 characters long"),

    body("titleUA")
        .exists({ checkFalsy: true })
        .withMessage("Ukrainian title must be provided")
        .isString()
        .withMessage("Ukrainian title must be a string")
        .isLength({ min: 1 })
        .withMessage("Ukrainian title must be at least 1 characters long"),

    body("imagePath").optional().isString().withMessage("Image path must be a string"),

    body("parentId").optional({ nullable: true }).isInt().withMessage("Parent id must be a number"),
];

const checkCategoryOnUpdate = [
    body("titleENG")
        .optional()
        .isString()
        .withMessage("English title must be a string")
        .isLength({ min: 1 })
        .withMessage("English title must be at least 1 characters long"),

    body("titleUA")
        .optional()
        .isString()
        .withMessage("Ukrainian title must be a string")
        .isLength({ min: 1 })
        .withMessage("Ukrainian title must be at least 1 characters long"),

    body("imagePath").optional().isString().withMessage("Image path must be a string"),

    body("parentId").optional({ nullable: true }).isInt().withMessage("Parent id must be a number"),
];

export { checkCategoryOnCreate, checkCategoryOnUpdate };
