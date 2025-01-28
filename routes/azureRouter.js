const express = require("express");
const multer = require("multer");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { initializeClient } = require("./azureClient");
const { validateFile } = require("../middleware/validateFile");

// Initialize Azure Vision client
const client = initializeClient();

// Multer file upload setup (store in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Analyze image route
router.post(
  "/analyze-image",
  upload.single("image"), // Middleware for handling file uploads
  validateFile,
  asyncHandler(async (req, res) => {
    try {
      // Check if file is present
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided." });
      }

      const imageBuffer = req.file.buffer; // Get the uploaded file as a buffer
      const features = ["Read"]; // Specify the Azure Vision features to use

      // Send the image to Azure Vision API
      const result = await client.path("/imageanalysis:analyze").post({
        body: imageBuffer,
        queryParameters: { features },
        contentType: "application/octet-stream",
      });

      const iaResult = result.body;

      // Check if the response contains read results
      if (iaResult?.readResult) {
        const response = {
          textBlocks: iaResult.readResult.blocks.map((block) => block.lines),
        };
        return res.json(response);
      }

      // If no read results, return an empty response
      res.json({ textBlocks: [] });
    } catch (error) {
      console.error("Error analyzing image:", error);
      res
        .status(500)
        .json({ error: "Failed to analyze image. Please try again later." });
    }
  })
);

module.exports = router;
