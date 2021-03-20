module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_liked_trainings', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        trainingId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'user_liked_trainings',
        timestamps: false
    })
};