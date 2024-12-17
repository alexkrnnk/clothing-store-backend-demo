import { ProductService } from "../services/index.js";

/**
 * Controller class for product-related operations.
 * @class
 */
export class ProductController {
    constructor() {
        this.service = new ProductService();
    }

    /**
     * Retrieves all products.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectAll(req, res) {
        const result = await this.service.selectAll();
        return { code: result.code, values: result.values };
    }

    /**
     * Retrieves a product by its ID.
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
     *  Retrieves all products on sales
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async getAllOnSale(req, res) {
        const { offset, limit } = req.query;
        const result = await this.service.getAllOnSale(offset, limit);
        return {
            code: result.code,
            values: result.values,
            currentPage: result.currentPage,
            totalItems: result.totalItems,
            totalPages: result.totalPages,
        };
    }

    /**
     * Retrieves all products associated with a specific category.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any, currentPage: number, totalItems: number, totalPages: number}>} The result of the operation.
     */
    async getAllProductByCategoryId(req, res) {
        const { categoryId } = req.params;
        const { offset, limit } = req.query;
        const result = await this.service.selectAllByCategoryId(categoryId, offset, limit);
        return {
            code: result.code,
            values: result.values,
            currentPage: result.currentPage,
            totalItems: result.totalItems,
            totalPages: result.totalPages,
        };
    }

    /**
     * Creates a new product.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async create(req, res) {
        const { body } = req;
        const fileNames = req.files.map((file) => file.filename);
        const data = {
            titleENG: body.titleENG,
            titleUA: body.titleUA,
            descriptionENG: body.descriptionENG,
            descriptionUA: body.descriptionUA,
            size: body.size,
            article: body.article,
            quantity: body.quantity,
            price: body.price,
            price_old: body.price_old,
            categoryId: body.categoryId,
            status: body.status,
            filenames: fileNames,
        };
        const result = await this.service.create(data);
        return { code: result.code, values: result.values };
    }

    /**
     * Updates an existing product.
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
     * Deletes a product by its ID.
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

const productController = new ProductController();

export default productController;
