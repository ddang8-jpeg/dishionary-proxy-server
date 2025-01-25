const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const { initializeClient } = require("./azureClient");
const { analyzeImage } = require("./routes/analyzeImage");
const { validateFile } = require("./middleware/validateFile");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:8081", // Only allow requests from this origin for testing
  })
);

// Security middleware
app.use(helmet());

// Parse JSON bodies
app.use(express.json());

// Multer file upload setup (store in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Initialize Azure Vision client
const client = initializeClient();

// Route to handle Azure Vision API requests
app.post(
  "/analyze-image",
  upload.single("image"),
  validateFile,
  analyzeImage(client)
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
