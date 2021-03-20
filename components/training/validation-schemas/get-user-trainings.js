const {checkSchema} = require('express-validator');

module.exports = checkSchema({
    userId: {
        in: ['query'],
        optional: true,
        isInt: {
            errorMessage: 'Should be a integer',
        }
    },
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