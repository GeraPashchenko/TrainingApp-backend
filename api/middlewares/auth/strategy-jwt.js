const StrategyJwt = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    User = require('../../models').users,
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
        const expirationDate = new Date(jwt_payload.exp * 1000);
        if(expirationDate < new Date()) {
            return done(null, {error: {
                errors: {
                    jwt: {
                        msg: "Token expired"
                    }
                }
            }});
        } else if (jwt_payload.uuid && jwt_payload.email) {
            const
                user = await User.findOne({
                    where: {
                        id: jwt_payload.uuid,
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