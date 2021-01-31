'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('trainings', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId:{
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onDelete: 'SET NULL'
            },
            exercises: {
                type: Sequelize.STRING,
                allowNull: false
            },
            reviews:{
                type: Sequelize.INTEGER,
                allowNull: false
            },
            likes:{
                type: Sequelize.INTEGER,
                allowNull: false
            },
            dislikes:{
                type: Sequelize.INTEGER,
                allowNull: false
            },
            rating:{
                type: Sequelize.INTEGER,
                allowNull: false
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('trainings');
    }
};
