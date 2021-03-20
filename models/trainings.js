module.exports = function (sequelize, DataTypes) {
    return sequelize.define('trainings', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        trainingName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        trainingPicture: {
          type: DataTypes.STRING,
          allowNull: false
        },
        trainingType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        exercises: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reviews:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        likes:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created: {
            type: "DATETIME",
            allowNull: false
        }
    }, {
        tableName: 'trainings',
        createdAt: 'created',
        updatedAt: false
    })
}