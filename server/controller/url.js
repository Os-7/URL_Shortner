const shortid = require('shortid');
const URL = require('../models/url');

// Handle the generation of a new short URL
async function handelGenerateNewShortURL(req, res) {
    const user = req.user;
    const body = req.body;

    // Log received request and user data for debugging
    console.log("Received request:", body);
    console.log("User data:", req.user);

    // Generate a unique short ID using the 'shortid' library
    const shortId = shortid();

    // Check if the URL is provided in the request body
    if (!body.url) {
        console.error("Error: URL is required");
        return res.status(400).json({ error: "URL is required" });
    }

    // Set expiration timestamp (48 hours from now)
    const expirationTimestamp = new Date();
    expirationTimestamp.setHours(expirationTimestamp.getHours() + 48);

    try {
        // Create a new URL document in the database
        const userId = req.user ? req.user._id : null;
        await URL.create({
            user: userId,
            shortId: shortId,
            requiredURL: body.url,
            visitHistory: [],
            expirationTimestamp: expirationTimestamp,
        });

        // Log success and return the short URL information
        console.log("Short URL created successfully");
        return res.json({ id: shortId, user: req.user._id });
    } catch (error) {
        // Log and handle errors during short URL creation
        console.error("Error creating short URL:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Handle the retrieval of analytics for a specific short URL
async function handelGetAnalytics(req,res){
    const shortId = req.params.shortId;

    // Query the database to get analytics for the specified short URL
    const result = await URL.findOne({shortId});

    // Respond with the analytics information
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
        expirationTimestamp: result.expirationTimestamp,
    })
}

// Function to fetch short links associated with the authenticated user
async function fetchUserShortLinks(req, res){
    try {
        // Retrieve the user ID from the authenticated user
        const user = req.user;

        // Query the database to get short links associated with the user
        const userShortLinks = await URL.find({ user });

        // Respond with the user's short links
        res.json(userShortLinks);
    } catch (error) {
        // Log and handle errors during fetching user short links
        console.error('Error fetching user short links:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    handelGenerateNewShortURL,
    handelGetAnalytics,
    fetchUserShortLinks
};
