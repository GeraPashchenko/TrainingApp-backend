module.exports = function (sequelize, DataTypes) {
    return sequelize.define('trainings', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'SET NULL'
        },
        exercises: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reviews:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        likes:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dislikes:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'trainings',
        timestamps: false
    })
}