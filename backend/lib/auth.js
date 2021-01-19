const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const knex = require('../lib/knex.js');
const bcrypt = require('bcryptjs');

//Passport functions
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    knex('users').where({
        id: id
    }).then((user) => {
        done(null, user);
    });
});

const strategyOptions = {};

passport.use(new LocalStrategy(strategyOptions, (username, password, done) => {
    knex('users').where({
        username: username
    }).first()
        .then((user) => {
            if (!user) {
                return done(null, false);
            }
            const incomingPwHash = bcrypt.hashSync(password, user.pw_salt);
            if (incomingPwHash === user.pw_hash) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => { return done(err); });
}));

let Auth = {};

Auth.doLogin = function () {
    return 0;
}

module.exports = Auth;
