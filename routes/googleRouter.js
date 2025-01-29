const express = require("express");
const asyncHandler = require("express-async-handler");
const axios = require("axios");
const router = express.Router();

// Route to get top 3 images from Google Custom Search
router.get(
  "/get-images",
  asyncHandler(async (req, res) => {
    const key = process.env["GOOGLE_SEARCH_KEY"];
    const id = process.env["GOOGLE_SEARCH_ENGINE_ID"];
    const url = process.env["GOOGLE_SEARCH_ENDPOINT"];
    const query = req.query.q;

    const response = await axios.get(url, {
      params: {
        key: key,
        cx: id,
        q: query,
        searchType: "image", // Restrict search to images
        num: 3, // Limit results to top 3 images
      },
    });

    // Extract image links
    const images = response.data.items.map((item) => ({
      title: item.title,
      link: item.link,
      contextLink: item.image.contextLink,
    }));

    res.json({ query, images });
  })
);

module.exports = router;
