const path = require('path');

module.exports = {
    definition: {
        info: {
            title: 'Training API',
            version: '1.0.1'
        },
        securityDefinitions: {
            jwt: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            }
        },
        security: [
            { jwt: [] }
        ]
    },
    apis: [
        path.join(__appRoot, 'components/*/index.js')
    ]
}