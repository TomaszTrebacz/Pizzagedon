module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable(
        "carts",
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID
            },
            userId: {
                allowNull: false,
                type: DataTypes.UUID
            }
        },
        {
            charset: "utf8"
        }
    );
};

module.exports.down = queryInterface => queryInterface.dropTable("carts");

