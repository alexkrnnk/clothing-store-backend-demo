import { body } from "express-validator";
import { OrderDeliveryMethodConst, OrderStatusConst } from "../middlewares/index.js";

const checkOrderOnCreate = [
    body("userId").optional({ nullable: true }).isInt().withMessage("User ID must be a number"),

    body("name")
        .exists({ checkFalsy: true })
        .withMessage("Name must be provided")
        .isString()
        .withMessage("Name must be a string")
        .matches(/^\p{Lu}/u)
        .withMessage("Name must start with an uppercase letter"),

    body("lastname")
        .exists({ checkFalsy: true })
        .withMessage("Last name must be provided")
        .isString()
        .withMessage("Last name must be a string")
        .matches(/^\p{Lu}/u)
        .withMessage("Last name must start with an uppercase letter"),

    body("phone")
        .exists({ checkFalsy: true })
        .withMessage("Phone must be provided")
        .isString()
        .withMessage("Phone must be a string")
        .isLength({ min: 10, max: 15 })
        .withMessage("Phone number must be between 10 and 15 characters long")
        .matches(/^\+?\d+$/)
        .withMessage("Invalid phone number: The field for entering the phone contains symbol " + " and numbers"),

    body("deliveryMethod")
        .exists({ checkFalsy: true })
        .withMessage("DeliveryMethod must be provided")
        .custom((value) => OrderDeliveryMethodConst.includes(value))
        .withMessage("Invalid DeliveryMethod"),

    body("address")
        .exists({ checkFalsy: true })
        .withMessage("Address must be provided")
        .isString()
        .withMessage("Address must be a string")
        .isLength({ min: 5 })
        .withMessage("Address must be at least 5 characters long"),

    body("comment")
        .optional()
        .isString()
        .withMessage("Comment must be a string")
        .isLength({ min: 2 })
        .withMessage("Comment must be at least 2 characters long"),

    body("status")
        .exists({ checkFalsy: true })
        .withMessage("Status must be provided")
        .custom((value) => OrderStatusConst.includes(value))
        .withMessage("Invalid Status"),
];

const checkOrderOnUpdate = [
    body("userId").optional({ nullable: true }).isInt().withMessage("User ID must be a number"),

    body("name")
        .optional()
        .isString()
        .withMessage("Name must be a string")
        .matches(/^\p{Lu}/u)
        .withMessage("Name must start with an uppercase letter"),

    body("lastname")
        .optional()
        .isString()
        .withMessage("Last name must be a string")
        .matches(/^\p{Lu}/u)
        .withMessage("Last name must start with an uppercase letter"),

    body("phone")
        .optional()
        .isString()
        .withMessage("Phone must be a string")
        .isLength({ min: 10, max: 15 })
        .withMessage("Phone number must be between 10 and 15 characters long")
        .matches(/^\+?\d+$/)
        .withMessage("Invalid phone number: The field for entering the phone contains symbol " + " and numbers"),

    body("deliveryMethod")
        .optional()
        .custom((value) => OrderDeliveryMethodConst.includes(value))
        .withMessage("Invalid DeliveryMethod"),

    body("address")
        .optional()
        .isString()
        .withMessage("Address must be a string")
        .isLength({ min: 5 })
        .withMessage("Address must be at least 5 characters long"),

    body("comment")
        .optional()
        .isString()
        .withMessage("Comment must be a string")
        .isLength({ min: 2 })
        .withMessage("Comment must be at least 2 characters long"),

    body("status")
        .optional()
        .custom((value) => OrderStatusConst.includes(value))
        .withMessage("Invalid Status"),
];

export { checkOrderOnCreate, checkOrderOnUpdate };
