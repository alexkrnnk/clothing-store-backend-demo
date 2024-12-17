import logger from "../config/logger.js";
import { Review } from "../models/index.js";

/**
 * Service class for managing review-related operations.
 */
export default class ReviewService {
    /**
     * Retrieves all reviews
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectAll() {
        try {
            const review = await Review.findAll();
            if (review) {
                return { code: 200, values: review };
            }
            return { code: 404, values: "reviews_not_found" };
        } catch (error) {
            logger.error(`Error selecting reviews: ${error.message}`);
            return { code: 500, values: `Error selecting reviews: ${error}` };
        }
    }

    /**
     * Retrieves a review by id
     * @param {string} id - The review's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectById(id) {
        try {
            const review = await Review.findByPk(id);
            if (review) {
                return { code: 200, values: review };
            }
            return { code: 404, values: "review_not_found" };
        } catch (error) {
            logger.error(`Error selecting review: ${error.message}`);
            return { code: 500, values: `Error selecting review: ${error}` };
        }
    }

    /**
     * Retrieves all reviews by product ID.
     * @param {string} productId - The ID of the product.
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values.
     */
    async selectAllByProductId(productId) {
        try {
            const reviews = await Review.findAll({
                where: {
                    productId: productId,
                },
            });

            if (reviews) {
                return { code: 200, values: reviews };
            }

            return { code: 404, values: "reviews_not_found" };
        } catch (error) {
            return { code: 500, values: `Error selecting reviews: ${error}` };
        }
    }

    /**
     * Creates a new review
     * @param {Object} data - Data for creating the review
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async create(data) {
        try {
            const newReview = await Review.create({
                userId: data.userId,
                productId: data.productId,
                text: data.text,
                rate: data.rate,
            });
            return { code: 200, values: "Review created successfully" };
        } catch (error) {
            logger.error(`Error creating review: ${error.message}`);
            return { code: 500, values: `Error creating review: ${error}` };
        }
    }

    /**
     * Update a review by id
     * @param {string} id - Id for updating the review
     * @param {Object} newData - New data for updating the review
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async update(id, newData) {
        try {
            const review = await Review.findByPk(id);

            if (!review) return { code: 404, values: "Review not found" };

            // Update the user only with the data that comes in newData
            const currentReviewData = review.set(newData);
            const result = await currentReviewData.save();

            return { code: 200, values: `Review updated successfully` };
        } catch (error) {
            logger.error(`Error updating review: ${error.message}`);
            return { code: 400, values: `Error updating review: ${error}` };
        }
    }

    /**
     * Delete a review by id
     * @param {string} id - The review's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async delete(id) {
        try {
            const deletedRowCount = await Review.destroy({
                where: {
                    id: id,
                },
            });
            if (deletedRowCount > 0) {
                return { code: 200, values: `Deleted ${deletedRowCount} reviews with ID ${id}` };
            } else {
                return { code: 400, values: `Review with ID ${id} not found or already deleted.` };
            }
        } catch (error) {
            logger.error(`Error when deleting a review by ID: ${error.message}`);
            return { code: 400, values: `Error when deleting a review by ID: ${error}` };
        }
    }

    /**
     * Checks if a review exists
     * @param {string} field - The field to search for the review
     * @param {string} value - The value of the field to search for
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async isExist(field, value) {
        try {
            const whereClause = {};
            whereClause[field] = value;
            const review = await Review.findOne({
                where: whereClause,
            });
            if (review) {
                return review;
            }
        } catch (error) {
            logger.error(`Error fetching review by ${field}: ${error.message}`);
            return { code: 500, values: `Error fetching review by ${field}` };
        }
    }
}
