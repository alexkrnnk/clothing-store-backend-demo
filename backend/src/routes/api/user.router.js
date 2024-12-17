import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import { userController } from "../../controllers/index.js";
import { validateRequestSchema, tryCatch, isAdmin, isAdminOrManager, isAuthorized } from "../../middlewares/index.js";
import { checkUserOnCreate, checkUserOnUpdate } from "../../validations/user.validation.js";
import { ifUserExist, ifUserNotExist } from "../../scripts/user/userChecking.script.js";
import { UserService } from "../../services/index.js";

/**
 * Router for user-related endpoints.
 * @type {Router}
 */
const userRouter = Router();

if (process.env.NODE_ENV !== "test") {
    userRouter.use(morgan("combined"));
}

/**
 * Route to retrieve all users.
 * @name GET /api/users/
 * @function
 * @memberof userRouter
 * @inner
 */
userRouter.get(
    "/",
    isAuthorized,
    isAdminOrManager,
    validateRequestSchema,
    tryCatch(userController.selectAll.bind(userController)),
);

/**
 * Route to retrieve a user by ID.
 * @name GET /api/users/:id
 * @function
 * @memberof userRouter
 * @inner
 */
userRouter.get(
    "/:id",
    function (req, res, next) {
        if (req.params.id === "email") {
            next("route");
        } else {
            next();
        }
    },
    isAuthorized,
    validateRequestSchema,
    tryCatch(userController.selectById.bind(userController)),
);

/**
 * Route to retrieve a user by email.
 * @name GET /api/users/email
 * @function
 * @memberof userRouter
 * @inner
 */
userRouter.get(
    "/email",
    isAuthorized,
    isAdminOrManager,
    validateRequestSchema,
    ifUserNotExist(UserService),
    tryCatch(userController.selectByEmail.bind(userController)),
);

/**
 * Route to create a new user.
 * @name POST /api/users/
 * @function
 * @memberof userRouter
 * @inner
 */
userRouter.post(
    "/",
    isAuthorized,
    isAdmin,
    checkUserOnCreate,
    validateRequestSchema,
    tryCatch(userController.create.bind(userController)),
);

/**
 * Route to update a user by ID.
 * @name PATCH /api/users/:id
 * @function
 * @memberof userRouter
 * @inner
 */
userRouter.patch(
    "/:id",
    isAuthorized,
    isAdmin,
    checkUserOnUpdate,
    validateRequestSchema,
    tryCatch(userController.update.bind(userController)),
);

/**
 * Route to delete a user by ID.
 * @name DELETE /api/users/:id
 * @function
 * @memberof userRouter
 * @inner
 */
userRouter.delete(
    "/:id",
    isAuthorized,
    isAdmin,
    validateRequestSchema,
    tryCatch(userController.delete.bind(userController)),
);

export default userRouter;
