const multer = require("multer");
const path = require("path");

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be saved
  },
  // filename: (req, file, cb) => {
  //   const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  //   cb(null, uniqueSuffix + path.extname(file.originalname));
  // },
  filename: function (req, file, cb) {
    const uniqueness = Date.now();
    cb(null, file.originalname + uniqueness);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = [".doc", ".docx", ".jpg", ".png"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only Word documents and pngs or jpgs are allowed."), false);
    }
  },
});

module.exports = upload;
