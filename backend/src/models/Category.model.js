import DataTypes from "sequelize";
import sequelize from "../database/db.js";

/**
 * Definition of the Category model.
 * @typedef {import("sequelize").Model} Model
 * @typedef {import("sequelize").DataTypes} DataTypes
 * @typedef {import("sequelize").DefinedModelAttributes} DefinedModelAttributes
 */

/**
 * Category model.
 * @typedef {Model & DefinedModelAttributes} Category
 */

/**
 * Definition of the Category model and its attributes.
 * @type {Category}
 */
const Category = sequelize.define(
    "Category",
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
        imagePath: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "categories",
                key: "id",
            },
        },
    },
    {
        tableName: "categories",
        timestamps: true,
    },
);

export default Category;
