const passport = require('passport');
const strategyJwtLocal = require('./strategy-jwt-local');

passport.use('jwt', strategyJwtLocal);

module.exports = passport;