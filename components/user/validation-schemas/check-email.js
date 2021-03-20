const { checkSchema } = require('express-validator');

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
    }
});
