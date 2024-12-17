import DataTypes from "sequelize";
import sequelize from "../database/db.js";

/**
 * Definition of the User model.
 * @typedef {import("sequelize").Model} Model
 * @typedef {import("sequelize").DataTypes} DataTypes
 * @typedef {import("sequelize").DefinedModelAttributes} DefinedModelAttributes
 */

/**
 * User model.
 * @typedef {Model & DefinedModelAttributes} User
 */

/**
 * Definition of the User model and its attributes.
 * @type {User}
 */
const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
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
        role: {
            type: DataTypes.ENUM("ADMIN", "MANAGER", "USER"),
            allowNull: false,
        },
    },
    {
        tableName: "users",
        timestamps: true,
    },
);

export default User;
