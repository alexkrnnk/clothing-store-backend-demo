import { CategoryService } from "../services/index.js";

/**
 * Controller class for category-related operations.
 * @class
 */
export class CategoryController {
    constructor() {
        this.service = new CategoryService();
    }

    /**
     * Retrieves all categories.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectAll(req, res) {
        const result = await this.service.selectAll();
        return { code: result.code, values: result.values };
    }

    /**
     * Retrieves a category by its ID.
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
     * Retrieves all categories with nested subcategories.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async getAllHeadWithNested(req, res) {
        const result = await this.service.selectAllHeadWithNested();
        return { code: result.code, values: result.values };
    }

    /**
     * Retrieves all nested subcategories of a specified parent category.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async getAllNestedByHeadId(req, res) {
        const { body } = req;
        const result = await this.service.selectAllNestedByHeadId(body.parentId);
        return { code: result.code, values: result.values };
    }

    /**
     * Retrieves all top-level categories (categories without parent categories).
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async getAllHead(req, res) {
        const result = await this.service.selectAllHead();
        return { code: result.code, values: result.values };
    }

    /**
     * Creates a new category.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async create(req, res) {
        const { body } = req;

        const data = {
            titleENG: body.titleENG,
            titleUA: body.titleUA,
            imagePath: req.file.filename,
            parentId: body.parentId,
        };

        const result = await this.service.create(data);
        return { code: result.code, values: result.values };
    }

    /**
     * Updates an existing category.
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
     * Deletes a category by its ID.
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

const categoryController = new CategoryController();

export default categoryController;
