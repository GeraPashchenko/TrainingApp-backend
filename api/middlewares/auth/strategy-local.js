const
    Strategy = require('passport-local').Strategy,
    User = require('../../models').users;
module.exports = new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
}, async (email, password, done) => {
    try {
        const
            user = await User.scope('login-data').findOne({
                where:{
                    email: email
                }
            });
        if (user && user.isPasswordValid(password)) {
            return done(null, user);
        } else if(!user) {
            return done(null, {error: {
                errors: {
                    email: {
                        msg: "User not found"
                    }
                }
            }});
        } else if(!user.isPasswordValid(password)){
            return done(null, {error: {
                errors: {
                    password: {
                        msg: "Wrong password"
                    }
                }
            }});
        }

    } catch (err) {
        done(err);
    }
});
