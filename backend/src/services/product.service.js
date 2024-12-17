import { Op } from "sequelize";
import logger from "../config/logger.js";
import { Product, Review, ProductImage } from "../models/index.js";

/**
 * Service class for managing product-related operations.
 */
export default class ProductService {
    /**
     * Retrieves all products
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectAll() {
        try {
            const product = await Product.findAll();
            if (product) {
                return { code: 200, values: product };
            }
            return { code: 404, values: "products_not_found" };
        } catch (error) {
            logger.error(`Error selecting products: ${error.message}`);
            return { code: 500, values: `Error selecting products: ${error}` };
        }
    }

    /**
     * Retrieves a product by id
     * @param {string} id - The product's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectById(id) {
        try {
            const product = await Product.findByPk(id);
            if (product) {
                return { code: 200, values: product };
            }
            return { code: 404, values: "product_not_found" };
        } catch (error) {
            logger.error(`Error selecting product: ${error.message}`);
            return { code: 500, values: `Error selecting product: ${error}` };
        }
    }

    /**
     * Retrieves all products on sales
     * @param {number} offset - The offset for pagination.
     * @param {number} limit - The limit for pagination.
     * @returns {Promise<{ code: number, values: any, currentPage: number, totalItems: number, totalPages: number }>} Promise containing code and values.
     */
    async getAllOnSale(offset, limit) {
        try {
            const page = parseInt(offset, 10) || 1;
            const pageSize = parseInt(limit, 10) || 10;
            const { count, rows } = await Product.findAndCountAll({
                where: {
                    price_old: {
                        [Op.ne]: null,
                    },
                },
                limit: pageSize,
                offset: (page - 1) * pageSize,
            });
            const products = rows;
            for (const product of products) {
                const reviews = await Review.findAll({
                    where: {
                        productId: product.id,
                    },
                });
                let totalRating = 0;
                for (const review of reviews) {
                    totalRating += review.rate;
                }
                const reviewCount = reviews.length;
                const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;

                product.setDataValue("reviewCount", reviewCount);
                product.setDataValue("averageRating", averageRating);
            }
            if (products.length > 0) {
                return {
                    code: 200,
                    values: products,
                    currentPage: page,
                    totalItems: count,
                    totalPages: Math.ceil(count / pageSize),
                };
            } else {
                return { code: 404, values: "products_not_found", currentPage: 0, totalItems: 0, totalPages: 0 };
            }
        } catch (error) {
            logger.error(`Error selecting products: ${error.message}`);
            return { code: 500, values: `Error selecting products: ${error}`, currentPage: 0, totalItems: 0, totalPages: 0 };
        }
    }

    /**
     * Retrieves all products by category ID with pagination.
     * @param {string} categoryId - The ID of the category.
     * @param {number} offset - The offset for pagination.
     * @param {number} limit - The limit for pagination.
     * @returns {Promise<{ code: number, values: any, currentPage: number, totalItems: number, totalPages: number }>} Promise containing code and values.
     */
    async selectAllByCategoryId(categoryId, offset, limit) {
        try {
            const page = parseInt(offset, 10) || 1;
            const pageSize = parseInt(limit, 10) || 10;
            const { count, rows } = await Product.findAndCountAll({
                where: {
                    categoryId: categoryId,
                },
                limit: pageSize,
                offset: (page - 1) * pageSize,
            });
            const products = rows;
            for (const product of products) {
                const reviews = await Review.findAll({
                    where: {
                        productId: product.id,
                    },
                });
                //Review.sum('rate', { where: { productId: product.id } })
                let totalRating = 0;
                for (const review of reviews) {
                    totalRating += review.rate;
                }
                const reviewCount = reviews.length;
                const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;

                product.setDataValue("reviewCount", reviewCount);
                product.setDataValue("averageRating", averageRating);
            }

            if (products.length > 0) {
                return {
                    code: 200,
                    values: products,
                    currentPage: page,
                    totalItems: count,
                    totalPages: Math.ceil(count / pageSize),
                };
            } else {
                return { code: 404, values: "products_not_found", currentPage: 0, totalItems: 0, totalPages: 0 };
            }
        } catch (error) {
            logger.error(`Error selecting products: ${error.message}`);
            return { code: 500, values: `Error selecting products: ${error}`, currentPage: 0, totalItems: 0, totalPages: 0 };
        }
    }

    /**
     * Creates a new product
     * @param {Object} data - Data for creating the product
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async create(data) {
        try {
            const newProduct = await Product.create({
                titleENG: `"${data.titleENG}"`,
                titleUA: data.titleUA,
                descriptionENG: data.descriptionENG,
                descriptionUA: data.descriptionUA,
                size: data.size,
                article: data.article,
                quantity: data.quantity,
                price: data.price,
                price_old: data.price_old,
                categoryId: data.categoryId,
                status: data.status,
            });
            for (let i = 0; i < data.filenames.length; i++) {
                const newProductImage = await ProductImage.create({
                    productId: newProduct.id,
                    path: data.filenames[i],
                });
            }
            return { code: 200, values: "Product created successfully" };
        } catch (error) {
            logger.error(`Error creating product: ${error.message}`);
            return { code: 500, values: `Error creating product: ${error}` };
        }
    }

    /**
     * Update a product by id
     * @param {string} id - Id for updating the product
     * @param {Object} newData - New data for updating the product
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async update(id, newData) {
        try {
            const product = await Product.findByPk(id);

            if (!product) return { code: 404, values: "Product not found" };

            // Update the product only with the data that comes in newData
            const currentProductData = product.set(newData);
            const result = await currentProductData.save();

            return { code: 200, values: `Product updated successfully` };
        } catch (error) {
            logger.error(`Error updating product: ${error.message}`);
            return { code: 400, values: `Error updating product: ${error}` };
        }
    }

    /**
     * Delete a product by id
     * @param {string} id - The product's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async delete(id) {
        try {
            const deletedRowCount = await Product.destroy({
                where: {
                    id: id,
                },
            });
            if (deletedRowCount > 0) {
                return { code: 200, values: `Deleted ${deletedRowCount} products with ID ${id}` };
            } else {
                return { code: 400, values: `Product with ID ${id} not found or already deleted.` };
            }
        } catch (error) {
            logger.error(`Error when deleting a product by ID: ${error.message}`);
            return { code: 400, values: `Error when deleting a product by ID: ${error}` };
        }
    }

    /**
     * Checks if a product exists
     * @param {string} field - The field to search for the product
     * @param {string} value - The value of the field to search for
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async isExist(field, value) {
        try {
            const whereClause = {};
            whereClause[field] = value;
            const product = await Product.findOne({
                where: whereClause,
            });
            if (product) {
                return product;
            }
        } catch (error) {
            logger.error(`Error fetching product by ${field}: ${error.message}`);
            return { code: 500, values: `Error fetching product by ${field}` };
        }
    }
}
