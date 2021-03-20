'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.js')[env];

module.exports = {
    sequelize: new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    ),
    Sequelize: Sequelize
};
