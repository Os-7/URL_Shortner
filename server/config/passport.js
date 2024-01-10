// Import required modules for Passport JWT authentication
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Import the database configuration and User model
const config = require('../config/database');
const User = require('../models/user');

// Export a function to configure Passport for JWT authentication
module.exports = function(passport){
    // Options for JWT strategy
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt'); // Extract JWT from the authorization header
    opts.secretOrKey = config.secret; // Secret key for JWT verification

    // Configure Passport to use JWT strategy
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // Log the JWT payload for debugging
        console.log('JWT Payload:', jwt_payload);

        // Find the user associated with the provided user ID in the payload
        User.getUserById(jwt_payload.id)
            .then(user => {
                // Check if the user was found
                if (!user) {
                    console.log('User not found');
                    return done(null, false);
                }

                // Log the found user for debugging
                console.log('User found:', user);

                // Return the user for successful authentication
                return done(null, user);
            })
            .catch(err => { 
                // Handle errors during user retrieval
                console.error(err);
                return done(err, false);
            });
    }));
}
