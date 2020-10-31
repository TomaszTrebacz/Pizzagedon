import { Sequelize } from "sequelize";

import accessEnv from "#root/helpers/accessEnv";

const DB_URI = accessEnv("DB_URI");

const sequelize = new Sequelize(DB_URI, {
    dialectOptions: {
        charset: "utf8",
        timezone: 'Etc/GMT0',
        multipleStatements: true
    },
    define: {
        timestamps: false
    },
    logging: false
});

export default sequelize;