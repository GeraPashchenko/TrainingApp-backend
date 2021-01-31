const
    passport = require('passport'),
    strategyJwt = require('./strategy-jwt'),
    strategyLocal = require('./strategy-local'),
    strategyJwtLocal = require('./strategy-jwt-local'),
    strategyAnonymous = require('./strategy-anonymous'),
    strategyGuest = require('./strategy-guest');

passport.use(strategyJwt);
passport.use('guest', strategyGuest);
passport.use('local', strategyLocal);
passport.use('jwt-local', strategyJwtLocal);
passport.use(strategyAnonymous);

module.exports = passport;