const express = require("express");
const multer = require("multer");
const { ImageAnalysisClient } = require("@azure-rest/ai-vision-image-analysis");
const createClient = require("@azure-rest/ai-vision-image-analysis").default;
const { AzureKeyCredential } = require("@azure/core-auth");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const endpoint = process.env["VISION_ENDPOINT"];
const key = process.env["VISION_KEY"];

const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const features = ["Read"];

// Set up Multer for file uploads
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

// Middleware
app.use(express.json()); // To parse JSON bodies if needed

// Route to handle Azure Vision API requests
app.post("/analyze-image", upload.single("image"), async (req, res) => {
  console.log("Request File:", req.file);
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  const imageBuffer = req.file.buffer; // Image file as a buffer (binary data)

  try {
    // Send the image buffer to Azure Vision API
    const result = await client.path("/imageanalysis:analyze").post({
      body: imageBuffer, // Pass binary data directly
      queryParameters: {
        features: features,
      },
      contentType: "application/octet-stream", // Content type for binary data
    });

    const iaResult = result.body;

    if (iaResult.readResult) {
      console.log("readResult:", iaResult.readResult);
      console.log("blocks:", iaResult.readResult.blocks);
    }

    const response = {
      textBlocks: iaResult.readResult
        ? iaResult.readResult.blocks.map((block) => block.lines)
        : null,
    };

    // Return the analysis result
    res.status(200).json(response);
  } catch (error) {
    console.error("Error calling Azure API:", error.message);
    res
      .status(500)
      .json({ error: "Failed to analyze image", details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
