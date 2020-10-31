import { DataTypes, Model } from "sequelize";

import sequelize from "./connection";

export class Product extends Model { }
Product.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED
        },
        categoryId: {
            allowNull: false,
            references: {
                key: "id",
                model: "productsCategories"
            },
            type: DataTypes.INTEGER.UNSIGNED
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        price: {
            allowNull: false,
            type: DataTypes.INTEGER.UNSIGNED
        },
        imageUrl: {
            allowNull: false,
            type: DataTypes.STRING
        }
    },
    { sequelize, modelName: "products" }
);

export class productCategory extends Model { }
productCategory.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        iconName: {
            allowNull: false,
            type: DataTypes.STRING
        }
    },
    { sequelize, modelName: "productsCategories" }
);

export class Cart extends Model { }
Cart.init(
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
    },
    { sequelize, modelName: "carts" }
);


export class CartProduct extends Model { }
CartProduct.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED
        },
        cartId: {
            allowNull: false,
            references: {
                key: "id",
                model: "cart"
            },
            type: DataTypes.UUID
        },
        productId: {
            allowNull: false,
            references: {
                key: "id",
                model: "product"
            },
            type: DataTypes.INTEGER.UNSIGNED
        },
        quantity: {
            allowNull: false,
            type: DataTypes.INTEGER.UNSIGNED
        }
    },
    { sequelize, modelName: "cartsProducts" }
);




