const StrategyJwt = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    User = require('../../models').users,
    opts = {
        jwtFromRequest: ExtractJwt.fromExtractors([
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            ExtractJwt.fromHeader('Authorization'),
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            ExtractJwt.fromUrlQueryParameter('token'),
            ExtractJwt.fromUrlQueryParameter('state'),
        ]),
        secretOrKey: process.env.JWT_SECRET
    };

module.exports = new StrategyJwt(opts, async function (jwt_payload, done) {
    try {
        if (jwt_payload.email) {
            const user = await User.findOne({
                where: {
                    email: jwt_payload.email
                }
            });

            return done(null, user)
        } else {
            return done(null, false);
        }
    } catch (err) {
        done(err);
    }
});