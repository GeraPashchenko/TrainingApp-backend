'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('trainings', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            trainingName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            trainingPicture: {
                type: Sequelize.STRING,
                allowNull: false
            },
            trainingType: {
                type: Sequelize.STRING,
                allowNull: false
            },
            userId:{
                type: Sequelize.INTEGER,
                allowNull: false
            },
            exercises: {
                type: Sequelize.STRING,
                allowNull: false
            },
            reviews:{
                type: Sequelize.INTEGER,
                allowNull: true,
                default: 0
            },
            likes:{
                type: Sequelize.INTEGER,
                allowNull: true,
                default: 0
            },
            dislikes:{
                type: Sequelize.INTEGER,
                allowNull: true,
                default: 0
            },
            rating:{
                type: Sequelize.INTEGER,
                allowNull: true,
                default: 0
            },
            created: {
                type: "DATETIME",
                allowNull: false,
                default: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('trainings');
    }
};
