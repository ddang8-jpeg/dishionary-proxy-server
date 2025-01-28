const { ImageAnalysisClient } = require("@azure-rest/ai-vision-image-analysis");
const createClient = require("@azure-rest/ai-vision-image-analysis").default;
const { AzureKeyCredential } = require("@azure/core-auth");

function initializeClient() {
  const endpoint = process.env["VISION_ENDPOINT"];
  const key = process.env["VISION_KEY"];

  if (!endpoint || !key) {
    throw new Error("Azure Vision API credentials are not set.");
  }

  const credential = new AzureKeyCredential(key);
  return createClient(endpoint, credential);
}

module.exports = { initializeClient };
