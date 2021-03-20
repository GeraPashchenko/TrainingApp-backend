const models = require('../models');
const User_saved_trainings = models.user_saved_trainings;
const Sequelize = require('../lib/sequelize').Sequelize;
const Op = Sequelize.Op;
const paginate = require('../services/paginate');

User_saved_trainings.findAndPaginate = paginate.findAndPaginate;

//Associations
User_saved_trainings.hasOne(models.users, {as: "User", foreignKey: 'id', sourceKey: 'userId'});
User_saved_trainings.belongsTo(models.trainings, {as: "Training", foreignKey: 'trainingId', targetKey: 'id'});


//Scopes
User_saved_trainings.addScope('savedTrainings', query => ({
    include: [
        {
            model: models.users,
            as: "User",
            attributes: {exclude: ['password']}
        },
        {
            model: models.trainings,
            as: "Training"
        }
    ],
    where: {
        userId: query
    }
}));

User_saved_trainings.findSavedTraining = function (query) {
    return this.findOne(
        {
            include: [
                {
                    model: models.users,
                    as: "User",
                    attributes: {exclude: ['password']}
                },
                {
                    model: models.trainings,
                    as: "Training"
                }
            ],
            where: {
                [Op.and]: [
                    {userId: query.userId},
                    {trainingId: query.trainingId}
                ]
            }
        })
};


module.exports = User_saved_trainings;