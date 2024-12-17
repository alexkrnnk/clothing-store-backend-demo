import { body } from "express-validator";

/**
 * Validation chain method for user registration
 */
export const registerValidateChainMethod = [
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
    body("confirmPassword")
        .exists({ checkFalsy: true })
        .withMessage("Password confirmation must be provided")
        .isString()
        .withMessage("Password confirmation must be a string")
        .custom(async (value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
        }),
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
];

/**
 * Validation chain method for user login
 */
export const loginValidateChainMethod = [
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
        .withMessage("Password must be a string"),
];

/**
 * Validation chain method for user logout
 */
export const logoutValidateChainMethod = [];
