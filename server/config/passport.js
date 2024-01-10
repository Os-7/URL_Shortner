const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config/database');
const User = require('../models/user');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
        console.log('JWT Payload:', jwt_payload);

        User.getUserById(jwt_payload.id)
            .then(user => {
                if (!user) {
                    console.log('User not found');
                    return done(null, false);
                }
                console.log('User found:', user);
                return done(null, user);
            })
            .catch(err => { 
                console.error(err);
                return done(err, false);
            });
    }));
}