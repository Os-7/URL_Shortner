const express = require('express');
const URL = require('../models/url');
const router = express.Router();

router.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true } // Return the updated document
        );

        console.log('Query result:', entry);

        if (!entry) {
            // Handle the case when the shortId is not found
            return res.status(404).send('Short URL not found');
        }

        // Check if the short URL has expired
        const now = new Date();
        const expirationTime = new Date(entry.expirationTimestamp);
        if (now > expirationTime) {
            return res.status(410).send('Short URL has expired');
        }

        // Redirect to the original URL
        res.redirect(entry.requiredURL);
    } catch (error) {
        console.error('Error processing short URL:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
