const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const azureRouter = require("./routes/azureRouter");
const googleRouter = require("./routes/googleRouter");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(
  cors()
  //{origin: "http://localhost:8081", // Only allow requests from this origin for testing}
);

// Security middleware
app.use(helmet());

// Parse JSON bodies
app.use(express.json());

// Route to handle Azure Vision API requests
app.use("/azure", azureRouter);

// Route to handle Google Custom Search API request
app.use("/google", googleRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
