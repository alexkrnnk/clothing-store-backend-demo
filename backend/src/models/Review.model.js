import DataTypes from "sequelize";
import sequelize from "../database/db.js";

/**
 * Definition of the Review model.
 * @typedef {import("sequelize").Model} Model
 * @typedef {import("sequelize").DataTypes} DataTypes
 * @typedef {import("sequelize").DefinedModelAttributes} DefinedModelAttributes
 */

/**
 * Review model.
 * @typedef {Model & DefinedModelAttributes} Review
 */

/**
 * Definition of the Review model and its attributes.
 * @type {Review}
 */
const Review = sequelize.define(
    "Review",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "products",
                key: "id",
            },
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "reviews",
        timestamps: true,
    },
);

export default Review;
