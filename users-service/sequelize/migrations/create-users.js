module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable(
        "users",
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true
            },
            password: {
                allowNull: false,
                type: DataTypes.CHAR(64)
            },
            role: {
                defaultValue: 'user',
                type: DataTypes.ENUM('root', 'admin', 'worker', 'deliverer', 'writer', 'user')
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            surname: {
                allowNull: false,
                type: DataTypes.STRING,
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
            },
            phoneNumber: {
                allowNull: true,
                type: DataTypes.INTEGER,
            }
        },
        {
            charset: "utf8"
        }
    );
};

module.exports.down = queryInterface => queryInterface.dropTable("users");