const { checkSchema } = require('express-validator');

module.exports = checkSchema({
    fileName: {
        in: "query",
        errorMessage: 'Field is required in body',
        exists: {
            errorMessage: 'Field is required in body'
        },
        isString: {
            errorMessage: "Should be a string"
        }
    }
})