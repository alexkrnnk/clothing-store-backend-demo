import { body } from "express-validator";
import { UserRolesConst } from "../middlewares/index.js";

const checkUserOnCreate = [
    body("email")
        .exists({ checkFalsy: true })
        .withMessage("Email must be provided")
        .isString()
        .withMessage("Email must be a string")
        .isEmail()
        .withMessage("Invalid email format"),

    body("password")
        .exists({ checkFalsy: true })
        .withMessage("Password must be provided")
        .isString()
        .withMessage("Password must be a string")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long")
        .matches(/.*[a-zA-Z].*/)
        .withMessage("Password must contain at least one letter")
        .matches(/.*\d.*/)
        .withMessage("Password must contain at least one number")
        .matches(/.*[!@#\$%\^&\*]/)
        .withMessage("Password must contain at least one special character (!@#$%^&*)"),

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

    body("role")
        .exists({ checkFalsy: true })
        .withMessage("Role must be provided")
        .custom((value) => UserRolesConst.includes(value))
        .withMessage("Invalid Role"),
];

const checkUserOnUpdate = [
    body("email").optional().isString().withMessage("Email must be a string").isEmail().withMessage("Invalid email format"),

    body("password")
        .optional()
        .isString()
        .withMessage("Password must be a string")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long")
        .matches(/.*[a-zA-Z].*/)
        .withMessage("Password must contain at least one letter")
        .matches(/.*\d.*/)
        .withMessage("Password must contain at least one number")
        .matches(/.*[!@#\$%\^&\*]/)
        .withMessage("Password must contain at least one special character (!@#$%^&*)"),

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

    body("role")
        .optional()
        .custom((value) => UserRolesConst.includes(value))
        .withMessage("Invalid Role"),
];

export { checkUserOnCreate, checkUserOnUpdate };
