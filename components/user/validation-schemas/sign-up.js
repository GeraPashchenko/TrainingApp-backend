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
    },
    firstName: {
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
            errorMessage: 'Should be min 2 characters'
        }
    },
    lastName: {
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
            errorMessage: 'Should be min 2 characters'
        }
    },
    age: {
        in: ['body'],
        errorMessage: 'Field is required in body',
        exists: {
            errorMessage: 'Field is required in body'
        },
        isInt: {
            errorMessage: 'Should be integer between 14 and 99',
            options: {
                min: 14,
                max: 99
            }
        },
        isLength: {
            options: {
                min: 2,
                max: 2
            },
            errorMessage: 'Should be min 2 characters'
        }
    },
    bodyType: {
        in: ['body'],
        errorMessage: 'Field is required in body',
        exists: {
            errorMessage: 'Field is required in body'
        },
        isString: {
            errorMessage: 'Should be a string'
        },
        isIn: {
            options: [
                "Эктоморф",
                "Мезоморф",
                "Эндоморф",
                "Ectomorph",
                "Endomorph",
                "Mesomorph"
            ]
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
});
