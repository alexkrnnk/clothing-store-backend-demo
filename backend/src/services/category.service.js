import logger from "../config/logger.js";
import { Category } from "../models/index.js";

/**
 * Service class for managing category-related operations.
 */
export default class CategoryService {
    /**
     * Retrieves all categories
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectAll() {
        try {
            const category = await Category.findAll();
            if (category) {
                return { code: 200, values: category };
            }
            return { code: 404, values: "categories_not_found" };
        } catch (error) {
            logger.error(`Error selecting categories: ${error.message}`);
            return { code: 500, values: `Error selecting categories: ${error}` };
        }
    }

    /**
     * Retrieves a category by id
     * @param {string} id - The category's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectById(id) {
        try {
            const category = await Category.findByPk(id);
            if (category) {
                return { code: 200, values: category };
            }
            return { code: 404, values: "category_not_found" };
        } catch (error) {
            logger.error(`Error selecting category: ${error.message}`);
            return { code: 500, values: `Error selecting category: ${error}` };
        }
    }

    /**
     * Retrieves all head categories with nested subcategories.
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values.
     */
    async selectAllHeadWithNested() {
        try {
            const rootCategories = await Category.findAll({
                where: {
                    parentId: null,
                },
            });

            const categoriesWithNested = await Promise.all(
                rootCategories.map(async (rootCategory) => {
                    const subcategories = await Category.findAll({
                        where: {
                            parentId: rootCategory.id,
                        },
                    });
                    return {
                        ...rootCategory.toJSON(),
                        subcategories,
                    };
                }),
            );

            if (categoriesWithNested) {
                return { code: 200, values: categoriesWithNested };
            }

            return { code: 404, values: "categories_not_found" };
        } catch (error) {
            logger.error(`Error selecting categories with nested categories: ${error.message}`);
            return { code: 500, values: `Error selecting categories with nested categories: ${error}` };
        }
    }

    /**
     * Retrieves all nested subcategories by head category ID.
     * @param {string} parentId - The ID of the parent category.
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values.
     */
    async selectAllNestedByHeadId(parentId) {
        try {
            const nested = await Category.findAll({
                where: {
                    parentId: parentId,
                },
            });

            const head = await Category.findOne({
                where: {
                    id: parentId,
                },
            });

            if (head) {
                const response = {
                    id: head.id,
                    titleENG: head.titleENG,
                    titleUA: head.titleUA,
                    imagePath: head.imagePath,
                    parentId: head.parentId,
                    createdAt: head.createdAt,
                    updatedAt: head.updatedAt,
                    subCategories: nested,
                };

                return { code: 200, values: response };
            }

            return { code: 404, values: "categories_not_found" };
        } catch (error) {
            logger.error(`Error selecting head category with nested categories: ${error.message}`);
            return { code: 500, values: "Error selecting head category with nested categories" };
        }
    }

    /**
     * Retrieves all head categories.
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values.
     */
    async selectAllHead() {
        try {
            const heads = await Category.findAll({
                where: {
                    parentId: null,
                },
            });

            if (heads) return { code: 200, values: heads };

            return { code: 404, values: "heads_categories_not_found" };
        } catch (error) {
            logger.error(`Error selecting head categories: ${error.message}`);
            return { code: 500, values: "Error selecting head categories" };
        }
    }

    /**
     * Creates a new user
     * @param {Object} data - Data for creating the user
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async create(data) {
        try {
            const newCategory = await Category.create({
                titleENG: data.titleENG,
                titleUA: data.titleUA,
                imagePath: data.imagePath,
                parentId: data.parentId,
            });
            return { code: 200, values: "Category created successfully" };
        } catch (error) {
            logger.error(`Error creating category: ${error.message}`);
            return { code: 500, values: `Error creating category: ${error}` };
        }
    }

    /**
     * Update a category by id
     * @param {string} id - Id for updating the category
     * @param {Object} newData - New data for updating the category
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async update(id, newData) {
        try {
            const category = await Category.findByPk(id);

            if (!category) return { code: 404, values: "Category not found" };

            const currentCategoryData = category.set(newData);
            const result = await currentCategoryData.save();

            return { code: 200, values: `Category updated successfully` };
        } catch (error) {
            logger.error(`Error updating category: ${error.message}`);
            return { code: 400, values: `Error updating category: ${error}` };
        }
    }

    /**
     * Delete a category by id
     * @param {string} id - The category's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async delete(id) {
        try {
            const deletedRowCount = await Category.destroy({
                where: {
                    id: id,
                },
            });
            if (deletedRowCount > 0) {
                return { code: 200, values: `Deleted ${deletedRowCount} categories with ID ${id}` };
            } else {
                return { code: 400, values: `Category with ID ${id} not found or already deleted.` };
            }
        } catch (error) {
            logger.error(`Error when deleting a category by ID: ${error.message}`);
            return { code: 400, values: `Error when deleting a category by ID: ${error}` };
        }
    }

    /**
     * Checks if a category exists
     * @param {string} field - The field to search for the category
     * @param {string} value - The value of the field to search for
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async isExist(field, value) {
        try {
            const whereClause = {};
            whereClause[field] = value;
            const category = await Category.findOne({
                where: whereClause,
            });
            if (category) {
                return category;
            }
        } catch (error) {
            logger.error(`Error fetching category by ${field}: ${error.message}`);
            return { code: 500, values: `Error fetching category by ${field}` };
        }
    }
}
