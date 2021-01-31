const StrategyJwt = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    opts = {
        jwtFromRequest:ExtractJwt.fromExtractors([
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            ExtractJwt.fromUrlQueryParameter('token'),
            ExtractJwt.fromUrlQueryParameter('state'),
        ]),
        secretOrKey: process.env.JWT_SECRET
    };

module.exports = new StrategyJwt(opts, async function(jwt_payload, done) {
    try {
        if (jwt_payload.sub && jwt_payload.sub === process.env.JWT_SUB) {
            return done(null, jwt_payload)
        } else {
            return done(null, false);
        }
    } catch (err) {
        done(err);
    }
});