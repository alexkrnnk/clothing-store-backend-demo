import { body } from "express-validator";

const checkProductOnCreate = [
    body("titleENG")
        .exists({ checkFalsy: true })
        .withMessage("English title must be provided")
        .isString()
        .withMessage("English title must be a string")
        .isLength({ min: 2 })
        .withMessage("English title must be at least 2 characters long"),

    body("titleUA")
        .exists({ checkFalsy: true })
        .withMessage("Ukrainian title must be provided")
        .isString()
        .withMessage("Ukrainian title must be a string")
        .isLength({ min: 2 })
        .withMessage("Ukrainian title must be at least 2 characters long"),

    body("descriptionENG")
        .exists({ checkFalsy: true })
        .withMessage("English description must be provided")
        .isString()
        .withMessage("English description must be a string")
        .isLength({ min: 5 })
        .withMessage("English description must be at least 5 characters long"),

    body("descriptionUA")
        .exists({ checkFalsy: true })
        .withMessage("Ukrainian description must be provided")
        .isString()
        .withMessage("Ukrainian description must be a string")
        .isLength({ min: 5 })
        .withMessage("Ukrainian description must be at least 5 characters long"),

    body("size")
        .exists({ checkFalsy: true })
        .withMessage("Size must be provided")
        .isString()
        .withMessage("Size must be a string"),

    body("article")
        .exists({ checkFalsy: true })
        .withMessage("Article must be provided")
        .isInt()
        .withMessage("Article must be a number"),

    body("quantity").optional({ nullable: true }).isInt().withMessage("Quantity must be a number"),

    body("price")
        .exists({ checkFalsy: true })
        .withMessage("Price must be provided")
        .isDecimal({ decimal_digits: "2" })
        .withMessage("Price must be a decimal number with 2 digits after the decimal point"),

    body("price_old")
        .optional({ nullable: true })
        .isDecimal({ decimal_digits: "2" })
        .withMessage("Price must be a decimal number with 2 digits after the decimal point"),

    body("categoryId").optional({ nullable: true }).isInt().withMessage("Category id must be a number"),

    body("status")
        .exists({ checkFalsy: true })
        .withMessage("Status must be provided")
        .isIn(["IN_STOCK", "NOT_AVAILABLE", "DELIVERY_AWAITED"])
        .withMessage("Invalid status provided. Must be one of: IN_STOCK, NOT_AVAILABLE, DELIVERY_AWAITED"),
];

const checkProductOnUpdate = [
    body("titleENG")
        .optional()
        .isString()
        .withMessage("English title must be a string")
        .isLength({ min: 2 })
        .withMessage("English title must be at least 2 characters long"),

    body("titleUA")
        .optional()
        .isString()
        .withMessage("Ukrainian title must be a string")
        .isLength({ min: 2 })
        .withMessage("Ukrainian title must be at least 2 characters long"),

    body("descriptionENG")
        .optional()
        .isString()
        .withMessage("English description must be a string")
        .isLength({ min: 5 })
        .withMessage("English description must be at least 5 characters long"),

    body("descriptionUA")
        .optional()
        .isString()
        .withMessage("Ukrainian description must be a string")
        .isLength({ min: 5 })
        .withMessage("Ukrainian description must be at least 5 characters long"),

    body("size").optional().isString().withMessage("Size must be a string"),

    body("article").optional().isInt().withMessage("Article must be a number"),

    body("quantity").optional({ nullable: true }).isInt().withMessage("Quantity must be a number"),

    body("price")
        .optional()
        .isDecimal({ decimal_digits: "2" })
        .withMessage("Price must be a decimal number with 2 digits after the decimal point"),

    body("price_old")
        .optional({ nullable: true })
        .isDecimal({ decimal_digits: "2" })
        .withMessage("Price must be a decimal number with 2 digits after the decimal point"),

    body("categoryId").optional({ nullable: true }).isInt().withMessage("Category id must be a number"),

    body("status")
        .optional()
        .isIn(["IN_STOCK", "NOT_AVAILABLE", "DELIVERY_AWAITED"])
        .withMessage("Invalid status provided. Must be one of: IN_STOCK, NOT_AVAILABLE, DELIVERY_AWAITED"),
];

export { checkProductOnCreate, checkProductOnUpdate };
