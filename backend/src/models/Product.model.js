import DataTypes from "sequelize";
import sequelize from "../database/db.js";

/**
 * Definition of the Product model.
 * @typedef {import("sequelize").Model} Model
 * @typedef {import("sequelize").DataTypes} DataTypes
 * @typedef {import("sequelize").DefinedModelAttributes} DefinedModelAttributes
 */

/**
 * Product model.
 * @typedef {Model & DefinedModelAttributes} Product
 */

/**
 * Definition of the Product model and its attributes.
 * @type {Product}
 */
const Product = sequelize.define(
    "Product",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        titleENG: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        titleUA: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        descriptionENG: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        descriptionUA: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        size: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        article: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        price_old: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "categories",
                key: "id",
            },
        },
        status: {
            type: DataTypes.ENUM("IN_STOCK", "NOT_AVAILABLE", "DELIVERY_AWAITED"),
            allowNull: false,
        },
    },
    {
        tableName: "products",
        timestamps: true,
    },
);

export default Product;
