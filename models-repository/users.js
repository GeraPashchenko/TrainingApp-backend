const models = require('../models');
const Users = models.users;
const Sequelize = require('../lib/sequelize').Sequelize;
const Op = Sequelize.Op;
const paginate = require('../services/paginate');

Users.findAndPaginate = paginate.findAndPaginate;

//Associations
Users.hasMany(models.trainings, {foreignKey: "userId", sourceKey: "id"});
Users.belongsTo(models.user_saved_trainings, {as: "User", foreignKey: 'id', targetKey: 'userId'});


//Scopes
Users.addScope('findByParam', query => ({
    where: {
        [Op.or]: [
            query.email ? { email: query.email} : null,
            query.firstName ? { firstName: query.firstName} : null,
            query.lastName ? { lastName: query.lastName} : null,
            query.id ? { id: query.id} : null,
        ]

    }
}));

Users.addScope('userObject', {
    attributes: {exclude: ['password']}
});

module.exports = Users;