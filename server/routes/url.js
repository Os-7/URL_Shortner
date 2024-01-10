const express = require('express');
const router = express.Router();
const passport = require('passport');
const { handelGenerateNewShortURL, handelGetAnalytics } = require("../controller/url");
const { fetchUserShortLinks } = require("../controller/url");

// Route to handle the generation of a new short URL
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    handelGenerateNewShortURL(req, res, req.user);
});

// Route to get analytics for a specific short URL
router.get('/analytics/:shortId', handelGetAnalytics);

// Middleware to require JWT authentication for the following routes
router.use(passport.authenticate('jwt', { session: false }));

// Route to fetch short links associated with the authenticated user
router.get('/user/short-links', fetchUserShortLinks);

// Export the router
module.exports = router;
