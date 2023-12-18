// middleware/uploadMiddleware.js
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDirectory = "./uploads";

// Create the uploads directory if it doesn't exist
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Define the destination folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = req.body.title + "-" + Date.now();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024, //limit file size to 1MB
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png and .jpeg format allowed!"));
    }
  },
});

module.exports = upload;
