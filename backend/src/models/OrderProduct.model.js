import DataTypes from "sequelize";
import sequelize from "../database/db.js";
import Product from "./Product.model.js";

/**
 * Definition of the OrderProduct model.
 * @typedef {import("sequelize").Model} Model
 * @typedef {import("sequelize").DataTypes} DataTypes
 * @typedef {import("sequelize").DefinedModelAttributes} DefinedModelAttributes
 */

/**
 * OrderProduct model.
 * @typedef {Model & DefinedModelAttributes} OrderProduct
 */

/**
 * Definition of the OrderProduct model and its attributes.
 * @type {OrderProduct}
 */
const OrderProduct = sequelize.define(
    "OrderProduct",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "orders",
                key: "id",
            },
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "products",
                key: "id",
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        parameters: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        subtotal: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
    },
    {
        tableName: "ordersproducts",
        timestamps: true,
    },
);

OrderProduct.belongsTo(Product, { foreignKey: "productId" });

export default OrderProduct;
