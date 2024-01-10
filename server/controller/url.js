const shortid = require('shortid');
const URL = require('../models/url');

async function handelGenerateNewShortURL(req, res) {
    const user = req.user;
    const body = req.body;
    console.log("Received request:", body);
    console.log("User data:", req.user);

    const shortId = shortid();
    if (!body.url) {
        console.error("Error: URL is required");
        return res.status(400).json({ error: "url is required" });
    }

    // Set expiration timestamp (48 hours from now)
    const expirationTimestamp = new Date();
    expirationTimestamp.setHours(expirationTimestamp.getHours() + 48);

    try {
        const userId = req.user ? req.user._id : null;
        await URL.create({
            user: userId,
            shortId: shortId,
            requiredURL: body.url,
            visitHistory: [],
            expirationTimestamp: expirationTimestamp,
        });
        console.log("Short URL created successfully");
        return res.json({ id: shortId, user: req.user._id });
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handelGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
        expirationTimestamp: result.expirationTimestamp,
    })
}

// Function to fetch user short links
async function fetchUserShortLinks(req, res){
    try {
        // Retrieve the user ID from the authenticated user
        const user = req.user;

        // Query the database to get short links associated with the user
        const userShortLinks = await URL.find({ user });

        // Respond with the user's short links
        res.json(userShortLinks);
    } catch (error) {
        console.error('Error fetching user short links:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    handelGenerateNewShortURL,
    handelGetAnalytics,
    fetchUserShortLinks
};
