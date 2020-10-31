module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable(
        "products",
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
        {
            charset: "utf8"
        }
    );
};

module.exports.down = queryInterface => queryInterface.dropTable("products");

