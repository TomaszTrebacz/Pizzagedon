module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable(
        "cartsProducts",
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
                    model: "carts"
                },
                type: DataTypes.UUID
            },
            productId: {
                allowNull: false,
                references: {
                    key: "id",
                    model: "products"
                },
                type: DataTypes.INTEGER.UNSIGNED
            },
            quantity: {
                allowNull: false,
                type: DataTypes.INTEGER.UNSIGNED
            }
        },
        {
            charset: "utf8"
        }
    );
};

module.exports.down = queryInterface => queryInterface.dropTable("cartsProducts");

