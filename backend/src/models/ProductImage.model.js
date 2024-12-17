import DataTypes from "sequelize";
import sequelize from "../database/db.js";

/**
 * Definition of the ProductImage model.
 * @typedef {import("sequelize").Model} Model
 * @typedef {import("sequelize").DataTypes} DataTypes
 * @typedef {import("sequelize").DefinedModelAttributes} DefinedModelAttributes
 */

/**
 * ProductImage model.
 * @typedef {Model & DefinedModelAttributes} ProductImage
 */

/**
 * Definition of the ProductImage model and its attributes.
 * @type {ProductImage}
 */
const ProductImage = sequelize.define(
    "ProductImage",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "products",
                key: "id",
            },
        },
        path: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: "productsimages",
        timestamps: false,
    },
);

export default ProductImage;
