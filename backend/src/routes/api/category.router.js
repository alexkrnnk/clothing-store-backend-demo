import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import { categoryController } from "../../controllers/index.js";
import { validateRequestSchema, tryCatch, isAdmin, isAdminOrManager, isAuthorized } from "../../middlewares/index.js";
import { checkCategoryOnCreate, checkCategoryOnUpdate } from "../../validations/category.validation.js";
import uploadCategoryImage from "../../scripts/categories/imageUpload.script.js";

/**
 * Router for category-related endpoints.
 * @type {Router}
 */
const categoryRouter = Router();

if (process.env.NODE_ENV !== "test") {
    categoryRouter.use(morgan("combined"));
}

/**
 * Route to retrieve all categories.
 * Accessible to all users.
 * @name GET /api/categories/
 * @function
 * @memberof categoryRouter
 * @inner
 */
categoryRouter.get("/", validateRequestSchema, tryCatch(categoryController.selectAll.bind(categoryController)));

/**
 * Route to retrieve a category by ID.
 * Accessible to all users.
 * @name GET /api/categories/getById/:id
 * @function
 * @memberof categoryRouter
 * @inner
 */
categoryRouter.get("/getById/:id", validateRequestSchema, tryCatch(categoryController.selectById.bind(categoryController)));

/**
 * Route to retrieve all head categories with nested subcategories.
 * Accessible to all users.
 * @name GET /api/categories/getAllHeadWithNested
 * @function
 * @memberof categoryRouter
 * @inner
 */
categoryRouter.get(
    "/getAllHeadWithNested",
    validateRequestSchema,
    tryCatch(categoryController.getAllHeadWithNested.bind(categoryController)),
);

/**
 * Route to retrieve all nested subcategories by head category ID.
 * Accessible to all users.
 * @name GET /api/categories/getAllNestedByHeadId
 * @function
 * @memberof categoryRouter
 * @inner
 */
categoryRouter.get(
    "/getAllNestedByHeadId",
    validateRequestSchema,
    tryCatch(categoryController.getAllNestedByHeadId.bind(categoryController)),
);

/**
 * Route to retrieve all head categories.
 * Accessible to all users.
 * @name GET /api/categories/getAllHead
 * @function
 * @memberof categoryRouter
 * @inner
 */
categoryRouter.get("/getAllHead", validateRequestSchema, tryCatch(categoryController.getAllHead.bind(categoryController)));

/**
 * Route to create a new category.
 * Requires authentication and admin/manager role.
 * @name POST /api/categories/
 * @function
 * @memberof categoryRouter
 * @inner
 */
categoryRouter.post(
    "/",
    isAuthorized,
    isAdminOrManager,
    uploadCategoryImage.single("image"),
    checkCategoryOnCreate,
    validateRequestSchema,
    tryCatch(categoryController.create.bind(categoryController)),
);

/**
 * Route to update a category by ID.
 * Requires authentication and admin/manager role.
 * @name PATCH /api/categories/:id
 * @function
 * @memberof categoryRouter
 * @inner
 */
categoryRouter.patch(
    "/:id",
    isAuthorized,
    isAdminOrManager,
    checkCategoryOnUpdate,
    validateRequestSchema,
    tryCatch(categoryController.update.bind(categoryController)),
);

/**
 * Route to delete a category by ID.
 * Requires authentication and admin/manager role.
 * @name DELETE /api/categories/:id
 * @function
 * @memberof categoryRouter
 * @inner
 */
categoryRouter.delete(
    "/:id",
    isAuthorized,
    isAdminOrManager,
    validateRequestSchema,
    tryCatch(categoryController.delete.bind(categoryController)),
);

export default categoryRouter;
