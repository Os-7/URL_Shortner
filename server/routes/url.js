const express = require('express');
const router = express.Router();
const passport = require('passport');
const { handelGenerateNewShortURL,handelGetAnalytics } = require("../controller/url");
const { fetchUserShortLinks } = require("../controller/url");

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    handelGenerateNewShortURL(req, res, req.user);
});

router.get('/analytics/:shortId', handelGetAnalytics);

router.use(passport.authenticate('jwt', { session: false }));

router.get('/user/short-links', fetchUserShortLinks);

module.exports = router;

