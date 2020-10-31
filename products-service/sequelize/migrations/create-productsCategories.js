module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable(
        "productsCategories",
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
        {
            charset: "utf8"
        }
    );
};

module.exports.down = queryInterface => queryInterface.dropTable("productsCategories");
