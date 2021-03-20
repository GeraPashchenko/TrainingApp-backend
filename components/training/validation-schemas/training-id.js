const { checkSchema } = require('express-validator');

module.exports = checkSchema({
    trainingId: {
        in: "body",
        errorMessage: 'Field is required in body',
        exists: {
            errorMessage: 'Field is required in body'
        }
    }
})