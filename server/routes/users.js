const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');
const config = require('../config/database');
const URL = require('../models/url');

// Register
router.post('/register', (req, res, next) => {
    // Handling user registration
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser)
        .then(user => res.json({ success: true, msg: 'User registered', user }))
        .catch(err => res.json({ success: false, msg: 'Failed to register user', error: err.message }));
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    // Handling user authentication
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username)
        .then(user => {
            if (!user) {
                return res.json({ success: false, msg: 'User Not Found' });
            }

            User.comparePassword(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // Generate JWT token upon successful authentication
                        const tokenPayload = {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email
                        };

                        const token = jwt.sign(tokenPayload, config.secret, {
                            expiresIn: 604800 // 1 Week
                        });

                        res.json({
                            success: true,
                            token: 'JWT ' + token,
                            user: tokenPayload
                        });
                    } else {
                        return res.json({ success: false, msg: 'Wrong Password' });
                    }
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ success: false, msg: 'Internal Server Error' });
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ success: false, msg: 'Internal Server Error' });
        });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    // Retrieving user profile
    console.log("Request user:", req.user);
    if (!req.user) {
        return res.status(401).json({ success: false, msg: 'Unauthorized' });
    }
    res.json({ success: true, user: req.user });
});

// Dashboard
router.get('/dashboard', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // Fetching user short URLs for the dashboard
    try {
        const userShortURLs = await URL.find({ user: req.user._id });
        res.json({ success: true, shortURLs: userShortURLs });
    } catch (error) {
        console.error('Error fetching user short URLs:', error);
        res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
});

module.exports = router;
