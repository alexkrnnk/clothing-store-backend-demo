import logger from "../config/logger.js";
import { Order, OrderProduct, Product } from "../models/index.js";

/**
 * Service class for managing order-related operations.
 */
export default class OrderService {
    /**
     * Retrieves all orders
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectAll() {
        try {
            const order = await Order.findAll();
            if (order) {
                return { code: 200, values: order };
            }
            return { code: 404, values: "orders_not_found" };
        } catch (error) {
            logger.error(`Error selecting orders: ${error.message}`);
            return { code: 500, values: `Error selecting orders: ${error}` };
        }
    }

    /**
     * Retrieves a order by id
     * @param {string} id - The order's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectById(id) {
        try {
            const order = await Order.findByPk(id);
            if (order) {
                return { code: 200, values: order };
            }
            return { code: 404, values: "order_not_found" };
        } catch (error) {
            logger.error(`Error selecting order: ${error.message}`);
            return { code: 500, values: `Error selecting order: ${error}` };
        }
    }

    /**
     * Retrieves all orders by user ID.
     * @param {string} userId - The ID of the user.
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values.
     */
    async selectAllOrdersByUserId(userId) {
        try {
            const orders = await Order.findAll({
                where: {
                    userId: userId,
                },
                include: [
                    {
                        model: OrderProduct,
                        attributes: ["quantity"],
                        include: [
                            {
                                model: Product,
                                attributes: [
                                    "id",
                                    "titleENG",
                                    "titleUA",
                                    "descriptionENG",
                                    "descriptionUA",
                                    "size",
                                    "article",
                                    "quantity",
                                    "price",
                                    "price_old",
                                    "categoryId",
                                    "status",
                                ],
                            },
                        ],
                    },
                ],
            });

            if (orders.length > 0) {
                return { code: 200, values: orders };
            }
            return { code: 404, values: "orders_not_found" };
        } catch (error) {
            logger.error(`Error selecting orders: ${error.message}`);
            return { code: 500, values: `Error selecting orders: ${error}` };
        }
    }

    /**
     * Creates a new user
     * @param {Object} data - Data for creating the user
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async create(data) {
        try {
            const newOrder = await Order.create({
                userId: data.userId,
                name: data.name,
                lastname: data.lastname,
                phone: data.phone,
                deliveryMethod: data.deliveryMethod,
                address: data.address,
                comment: data.comment,
                status: data.status,
            });

            for (const product of data.products) {
                await OrderProduct.create({
                    orderId: newOrder.id,
                    productId: product.productId,
                    quantity: product.quantity,
                    parameters: product.parameters,
                });
            }
            return { code: 200, values: "Order created successfully" };
        } catch (error) {
            logger.error(`Error creating order: ${error.message}`);
            return { code: 500, values: `Error creating order: ${error}` };
        }
    }

    /**
     * Update a order by id
     * @param {string} id - Id for updating the order
     * @param {Object} newData - New data for updating the order
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async update(id, newData) {
        try {
            const order = await Order.findByPk(id);

            if (!order) return { code: 404, values: "Order not found" };

            // Update the user only with the data that comes in newData
            const currentOrderData = order.set(newData);
            const result = await currentOrderData.save();

            return { code: 200, values: `Order updated successfully` };
        } catch (error) {
            logger.error(`Error updating order: ${error.message}`);
            return { code: 400, values: `Error updating order: ${error}` };
        }
    }

    /**
     * Delete a order by id
     * @param {string} id - The order's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async delete(id) {
        try {
            const deletedRowCount = await Order.destroy({
                where: {
                    id: id,
                },
            });
            if (deletedRowCount > 0) {
                return { code: 200, values: `Deleted ${deletedRowCount} orders with ID ${id}` };
            } else {
                return { code: 400, values: `Order with ID ${id} not found or already deleted.` };
            }
        } catch (error) {
            logger.error(`Error when deleting a order by ID: ${error.message}`);
            return { code: 400, values: `Error when deleting a order by ID: ${error}` };
        }
    }

    /**
     * Checks if a order exists
     * @param {string} field - The field to search for the order
     * @param {string} value - The value of the field to search for
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async isExist(field, value) {
        try {
            const whereClause = {};
            whereClause[field] = value;
            const order = await Order.findOne({
                where: whereClause,
            });
            if (order) {
                return order;
            }
        } catch (error) {
            logger.error(`Error fetching order by ${field}: ${error.message}`);
            return { code: 500, values: `Error fetching order by ${field}` };
        }
    }
}
