import { DataTypes, Model } from "sequelize";

import sequelize from "./connection";

export class Order extends Model { }
Order.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        userId: {
            allowNull: false,
            type: DataTypes.UUID
        },
        content: {
            allowNull: false,
            type: DataTypes.STRING
        },
        total: {
            allowNull: false,
            type: DataTypes.INTEGER.UNSIGNED
        },
        Accepted: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: '0'
        },
        Cooked: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: '0'
        },
        Delivered: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: '0'
        },
        phoneNumber: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        street: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        postCode: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        city: {
            allowNull: true,
            type: DataTypes.STRING,
        }
    },
    { sequelize, modelName: "orders" }
);

