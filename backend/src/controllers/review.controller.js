import { ReviewService } from "../services/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

/**
 * Controller class for review-related operations.
 * @class
 */
export class ReviewController {
    constructor() {
        this.service = new ReviewService();
    }

    /**
     * Retrieves all reviews.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectAll(req, res) {
        const result = await this.service.selectAll();
        return { code: result.code, values: result.values };
    }

    /**
     * Retrieves a review by its ID.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectById(req, res) {
        const { id } = req.params;
        const result = await this.service.selectById(id);
        return { code: result.code, values: result.values };
    }

    /**
     * Retrieves all reviews associated with a specific product.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async getAllReviewsByProductId(req, res) {
        const { productId } = req.params;
        const result = await this.service.selectAllByProductId(productId);
        return { code: result.code, values: result.values };
    }

    /**
     * Creates a new review.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async create(req, res) {
        const { body } = req;
        const { token } = req.headers;
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        const data = {
            userId: tokenData.userId,
            productId: body.productId,
            text: body.text,
            rate: body.rate,
        };
        const result = await this.service.create(data);
        return { code: result.code, values: result.values };
    }

    /**
     * Updates an existing review.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async update(req, res) {
        const { id } = req.params;
        const newData = req.body;
        const result = await this.service.update(id, newData);
        return { code: result.code, values: result.values };
    }

    /**
     * Deletes a review by its ID.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async delete(req, res) {
        const { id } = req.params;
        const result = await this.service.delete(id);
        return { code: result.code, values: result.values };
    }
}

const reviewController = new ReviewController();

export default reviewController;
