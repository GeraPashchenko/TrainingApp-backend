const { checkSchema } = require('express-validator');

module.exports = checkSchema({
    trainingName: {
        in: "body",
        errorMessage: 'Field is required in body',
        exists: {
            errorMessage: 'Field is required in body'
        },
        isString: {
            errorMessage: "Should be a string"
        }
    },
    trainingPicture: {
        in: "body",
        errorMessage: 'Field is required in body',
        exists: {
            errorMessage: 'Field is required in body'
        },
        isString: {
            errorMessage: "Should be a string"
        }
    },
    trainingType: {
        in: "body",
        errorMessage: 'Field is required in body',
        exists: {
            errorMessage: 'Field is required in body'
        },
        isString: {
            errorMessage: "Should be a string"
        },
        isIn: {
            options: [
                "Кардио",
                "Наращивание мышц",
                "Растяжка",
                "Терапевтическая",
                "Реабилитация",
                "Cardio",
                "Muscle gain",
                "Stretching",
                "Therapeutic",
                "Rehabilitation"
            ]
        }
    },
    userId: {
        in: "body",
        errorMessage: 'Field is required in body',
        exists: {
            errorMessage: 'Field is required in body'
        },
        isInt: {
            errorMessage: 'Should be integer'
        }
    },
    exercises: {
        in: "body",
        errorMessage: 'Field is required in body',
        exists: {
            errorMessage: 'Field is required in body'
        },
        isArray: {
            errorMessage: 'Should be array'
        }
    }
})