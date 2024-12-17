import { OrderService } from "../services/index.js";
import jwt from "jsonwebtoken";

/**
 * Controller class for order-related operations.
 * @class
 */
export class OrderController {
    constructor() {
        this.service = new OrderService();
    }

    /**
     * Retrieves all orders.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectAll(req, res) {
        const result = await this.service.selectAll();
        return { code: result.code, values: result.values };
    }

    /**
     * Retrieves an order by its ID.
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
     * Retrieves all orders associated with a specific user.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async getAllUsersOrders(req, res) {
        const { userId } = req.params;
        const result = await this.service.selectAllOrdersByUserId(userId);
        return { code: result.code, values: result.values };
    }

    /**
     * Creates a new order.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async create(req, res) {
        const { body } = req;
        const { userId, products } = body;
        const data = {
            userId: userId,
            name: body.name,
            lastname: body.lastname,
            phone: body.phone,
            deliveryMethod: body.deliveryMethod,
            address: body.address,
            comment: body.comment,
            status: body.status,
            products: products,
        };

        const result = await this.service.create(data);
        return { code: result.code, values: result.values };
    }

    /**
     * Updates an existing order.
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
     * Deletes an order by its ID.
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

const orderController = new OrderController();

export default orderController;
