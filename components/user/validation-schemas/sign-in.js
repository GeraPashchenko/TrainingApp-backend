const {checkSchema} = require('express-validator');

module.exports = checkSchema({
    email: {
        in: ['body'],
        errorMessage: 'Field is required in body',
        exists: {
            errorMessage: 'Field is required in body'
        },
        isEmail: {
            errorMessage: 'Wrong email format'
        }
    },
    password: {
        in: ['body'],
        errorMessage: 'Field is required in body',
        exists: {
            errorMessage: 'Field is required in body'
        },
        isString: {
            errorMessage: 'Should be a string'
        },
        isLength: {
            options: {
                min: 6
            },
            errorMessage: 'Should be min 6 characters'
        }
    }
})