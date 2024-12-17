import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import { orderController } from "../../controllers/index.js";
import { validateRequestSchema, tryCatch, isAdmin, isAdminOrManager, isAuthorized } from "../../middlewares/index.js";
import { checkOrderOnCreate, checkOrderOnUpdate } from "../../validations/order.validation.js";

/**
 * Router for handling order-related endpoints.
 * @type {Router}
 */
const orderRouter = Router();

if (process.env.NODE_ENV !== "test") {
    orderRouter.use(morgan("combined"));
}

/**
 * Route to retrieve all orders.
 * Requires authentication and admin/manager role.
 * @name GET /api/orders/
 * @function
 * @memberof orderRouter
 * @inner
 */
orderRouter.get(
    "/",
    isAuthorized,
    isAdminOrManager,
    validateRequestSchema,
    tryCatch(orderController.selectAll.bind(orderController)),
);

/**
 * Route to retrieve an order by ID.
 * Requires authentication and admin/manager role.
 * @name GET /api/orders/:id
 * @function
 * @memberof orderRouter
 * @inner
 */
orderRouter.get(
    "/:id",
    isAuthorized,
    isAdminOrManager,
    validateRequestSchema,
    tryCatch(orderController.selectById.bind(orderController)),
);

/**
 * Route to retrieve all orders of a specific user.
 * Requires authentication.
 * @name GET /api/orders/users/:userId
 * @function
 * @memberof orderRouter
 * @inner
 */
orderRouter.get(
    "/users/:userId",
    isAuthorized,
    validateRequestSchema,
    tryCatch(orderController.getAllUsersOrders.bind(orderController)),
);

/**
 * Route to create a new order.
 * Requires authentication.
 * @name POST /api/orders/
 * @function
 * @memberof orderRouter
 * @inner
 */
orderRouter.post("/", checkOrderOnCreate, validateRequestSchema, tryCatch(orderController.create.bind(orderController)));

/**
 * Route to update an order by ID.
 * Requires authentication and admin/manager role.
 * @name PATCH /api/orders/:id
 * @function
 * @memberof orderRouter
 * @inner
 */
orderRouter.patch(
    "/:id",
    isAuthorized,
    isAdminOrManager,
    checkOrderOnUpdate,
    validateRequestSchema,
    tryCatch(orderController.update.bind(orderController)),
);

/**
 * Route to delete an order by ID.
 * Requires admin/manager role.
 * @name DELETE /api/orders/:id
 * @function
 * @memberof orderRouter
 * @inner
 */
orderRouter.delete("/:id", isAdminOrManager, validateRequestSchema, tryCatch(orderController.delete.bind(orderController)));

export default orderRouter;
