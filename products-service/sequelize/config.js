module.exports.development = {
    dialect: "mariadb",
    seederStorage: "sequelize",
    url: process.env.DB_URI,
    dialectOptions: {
        timezone: 'Etc/GMT0',
    },
};
