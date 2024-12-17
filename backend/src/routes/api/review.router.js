import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import { reviewController } from "../../controllers/index.js";
import { validateRequestSchema, tryCatch, isAdmin, isAdminOrManager, isAuthorized } from "../../middlewares/index.js";
import { checkReviewOnCreate, checkReviewOnUpdate } from "../../validations/review.validation.js";

/**
 * Router for handling review-related endpoints.
 * @type {Router}
 */
const reviewRouter = Router();

if (process.env.NODE_ENV !== "test") {
    reviewRouter.use(morgan("combined"));
}

/**
 * Route to retrieve all reviews.
 * @name GET /api/reviews/
 * @function
 * @memberof reviewRouter
 * @inner
 */
reviewRouter.get("/", validateRequestSchema, tryCatch(reviewController.selectAll.bind(reviewController)));

/**
 * Route to retrieve a review by ID.
 * @name GET /api/reviews/:id
 * @function
 * @memberof reviewRouter
 * @inner
 */
reviewRouter.get("/:id", validateRequestSchema, tryCatch(reviewController.selectById.bind(reviewController)));

/**
 * Route to retrieve all reviews by product ID.
 * @name GET /api/reviews/product/:productId
 * @function
 * @memberof reviewRouter
 * @inner
 */
reviewRouter.get(
    "/product/:productId",
    validateRequestSchema,
    tryCatch(reviewController.getAllReviewsByProductId.bind(reviewController)),
);

/**
 * Route to create a new review.
 * @name POST /api/reviews/
 * @function
 * @memberof reviewRouter
 * @inner
 */
reviewRouter.post(
    "/",
    isAuthorized,
    checkReviewOnCreate,
    validateRequestSchema,
    tryCatch(reviewController.create.bind(reviewController)),
);

/**
 * Route to update a review by ID.
 * @name PATCH /api/reviews/:id
 * @function
 * @memberof reviewRouter
 * @inner
 */
reviewRouter.patch(
    "/:id",
    isAuthorized,
    isAdminOrManager,
    checkReviewOnUpdate,
    validateRequestSchema,
    tryCatch(reviewController.update.bind(reviewController)),
);

/**
 * Route to delete a review by ID.
 * @name DELETE /api/reviews/:id
 * @function
 * @memberof reviewRouter
 * @inner
 */
reviewRouter.delete(
    "/:id",
    isAuthorized,
    isAdminOrManager,
    validateRequestSchema,
    tryCatch(reviewController.delete.bind(reviewController)),
);

export default reviewRouter;
