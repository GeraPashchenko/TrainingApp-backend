const models = require('../models');
const User_liked_trainings = models.user_liked_trainings;
const Sequelize = require('../lib/sequelize').Sequelize;
const Op = Sequelize.Op;
const paginate = require('../services/paginate');

User_liked_trainings.findAndPaginate = paginate.findAndPaginate;

//Associations
User_liked_trainings.hasOne(models.users, {as: "User", foreignKey: 'id', sourceKey: 'userId'});
User_liked_trainings.belongsTo(models.trainings, {as: "Training", foreignKey: 'trainingId', targetKey: 'id'});


//Scopes
User_liked_trainings.addScope('liked', query => ({
    where: {
        [Op.and]: [
            {userId: query.userId},
            {trainingId: query.trainingId}
        ]
    }
}));


module.exports = User_liked_trainings;