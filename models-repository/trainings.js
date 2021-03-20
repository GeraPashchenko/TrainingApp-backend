const models = require('../models');
const Trainings = models.trainings;
const Sequelize = require('../lib/sequelize').Sequelize;
const Op = Sequelize.Op;
const paginate = require('../services/paginate');

Trainings.findAndPaginate = paginate.findAndPaginate;

//Associations
Trainings.belongsTo(models.users, {as: "Author", foreignKey: 'userId', targetKey: 'id'});
Trainings.hasMany(models.user_saved_trainings, {as: 'Training', foreignKey: 'trainingId', sourceKey: 'id'});


//Scopes
Trainings.findRecord = function (request) {
    return this.findOne({
        where: {
            [Op.and]: [
                {trainingName: request.trainingName},
                {userId: request.userId}
            ]
        }
    })
};

Trainings.addScope('findWithAuthor', {
    include: {
        model: models.users,
        as: 'Author'
    }
});

Trainings.addScope('findByUserId', userId => ({
    where: {userId}
}));


module.exports = Trainings;