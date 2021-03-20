const {checkSchema} = require('express-validator');

module.exports = checkSchema({
    limit: {
        in: ['query'],
        optional: true,
        isInt: {
            errorMessage: 'Should be a integer',
        }
    },
    offset: {
        in: ['query'],
        optional: true,
        isInt: {
            errorMessage: 'Should be a integer',
        }
    }
});