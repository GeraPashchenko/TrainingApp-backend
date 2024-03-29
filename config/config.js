const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_ROOT_PASSWORD,
        database: process.env.DB_NAME,
        host: '127.0.0.1',
        logging: console.log,
        dialect: 'mysql',
        define: {
            underscored: false,
            charset: 'latin1',
            collate: 'latin1_general_cs_as'
        },
        dialectOptions: {
            connectTimeout: 60000
        }
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        logging: false,
        dialect: 'mysql',
        define: {
            underscored: false,
            charset: 'latin1',
            collate: 'latin1_general_cs'
        },
        dialectOptions: {
            connectTimeout: 60000
        }
    }
};