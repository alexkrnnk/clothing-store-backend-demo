import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import { productController } from "../../controllers/index.js";
import {
    validateRequestSchema,
    tryCatch,
    isAdmin,
    isAdminOrManager,
    isAuthorized,
    tryCatchPagination,
    MAX_FILES,
} from "../../middlewares/index.js";
import { checkProductOnCreate, checkProductOnUpdate } from "../../validations/product.validation.js";
import uploadProductsImage from "../../scripts/products/imageUpload.script.js";
import { ifProductExist, ifProductNotExist } from "../../scripts/products/productChecking.script.js";
import { ProductService } from "../../services/index.js";

/**
 * Router for handling product-related endpoints.
 * @type {Router}
 */
const productRouter = Router();

if (process.env.NODE_ENV !== "test") {
    productRouter.use(morgan("combined"));
}

/**
 * Route to retrieve all products.
 * @name GET /api/products/
 * @function
 * @memberof productRouter
 * @inner
 */
productRouter.get("/", validateRequestSchema, tryCatch(productController.selectAll.bind(productController)));

/**
 * Route to retrieve a product by ID.
 * @name GET /api/products/:id
 * @function
 * @memberof productRouter
 * @inner
 */
productRouter.get(
    "/:id",
    function (req, res, next) {
        if (req.params.id === "sales") {
            next("route");
        } else {
            next();
        }
    },
    validateRequestSchema,
    tryCatch(productController.selectById.bind(productController)),
);

/**
 * Route to retrieve all products on sales
 * @name GET /api/products/sales
 * @function
 * @memberof productRouter
 * @inner
 */
productRouter.get(
    "/sales",
    validateRequestSchema,
    tryCatchPagination(productController.getAllOnSale.bind(productController)),
);

/**
 * Route to retrieve all products by category ID.
 * @name GET /api/products/category/:categoryId
 * @function
 * @memberof productRouter
 * @inner
 */
productRouter.get(
    "/category/:categoryId",
    validateRequestSchema,
    tryCatchPagination(productController.getAllProductByCategoryId.bind(productController)),
);

/**
 * Route to create a new product.
 * @name POST /api/products/
 * @function
 * @memberof productRouter
 * @inner
 */
productRouter.post(
    "/",
    isAuthorized,
    isAdminOrManager,
    uploadProductsImage.array("images", MAX_FILES),
    checkProductOnCreate,
    validateRequestSchema,
    ifProductExist(ProductService),
    tryCatch(productController.create.bind(productController)),
);

/**
 * Route to update a product by ID.
 * @name PATCH /api/products/:id
 * @function
 * @memberof productRouter
 * @inner
 */
productRouter.patch(
    "/:id",
    isAuthorized,
    isAdminOrManager,
    checkProductOnUpdate,
    validateRequestSchema,
    tryCatch(productController.update.bind(productController)),
);

/**
 * Route to delete a product by ID.
 * @name DELETE /api/products/:id
 * @function
 * @memberof productRouter
 * @inner
 */
productRouter.delete(
    "/:id",
    isAuthorized,
    isAdminOrManager,
    validateRequestSchema,
    tryCatch(productController.delete.bind(productController)),
);

export default productRouter;
