import DataTypes from "sequelize";
import sequelize from "../database/db.js";
import OrderProduct from "./OrderProduct.model.js";

/**
 * Definition of the Order model.
 * @typedef {import("sequelize").Model} Model
 * @typedef {import("sequelize").DataTypes} DataTypes
 * @typedef {import("sequelize").DefinedModelAttributes} DefinedModelAttributes
 */

/**
 * Order model.
 * @typedef {Model & DefinedModelAttributes} Order
 */

/**
 * Definition of the Order model and its attributes.
 * @type {Order}
 */
const Order = sequelize.define(
    "Order",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        totalSum: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        phone: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        deliveryMethod: {
            type: DataTypes.ENUM("AFTERPAY", "ONCARD", "VISAMC", "PRIVATE", "MONO"),
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("NEW", "WAITINGPAYMENT", "PAYED", "PROCESSED", "PACKING", "INDELIVERY", "DONE", "CANCELED"),
            allowNull: false,
        },
    },
    {
        tableName: "orders",
        timestamps: true,
    },
);

Order.hasMany(OrderProduct, { foreignKey: "orderId" });

export default Order;
