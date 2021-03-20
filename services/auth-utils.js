const jwt = require('jsonwebtoken');

module.exports.createToken = (tokenSourceData) => {
    const loginData = {
            email: tokenSourceData.email,
            id: tokenSourceData.id
        };

    return jwt.sign(loginData, process.env.JWT_SECRET, {
        algorithm:'HS512'
    });
};
