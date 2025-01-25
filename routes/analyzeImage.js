function analyzeImage(client) {
  return async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image uploaded" });
      }

      const imageBuffer = req.file.buffer; // Get image as buffer

      const features = ["Read"];
      const result = await client.path("/imageanalysis:analyze").post({
        body: imageBuffer,
        queryParameters: { features },
        contentType: "application/octet-stream",
      });

      const iaResult = result.body;

      if (iaResult?.readResult) {
        const response = {
          textBlocks: iaResult.readResult.blocks.map((block) => block.lines),
        };
        return res.status(200).json(response);
      }

      return res.status(200).json({ textBlocks: [] });
    } catch (error) {
      console.error("Error calling Azure API:", error);
      return res.status(500).json({
        error: "Failed to analyze image",
        details: error.message || error,
      });
    }
  };
}

module.exports = { analyzeImage };
