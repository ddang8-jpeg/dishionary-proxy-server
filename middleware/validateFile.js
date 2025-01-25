function validateFile(req, res, next) {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    return res
      .status(400)
      .json({
        error: "Invalid file type. Only JPG, PNG, or JPEG are allowed.",
      });
  }

  next();
}

module.exports = { validateFile };
