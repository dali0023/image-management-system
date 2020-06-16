const express = require("express");
const router = express.Router();
const path = require("path");
const ImageController = require("../controllers/ImageController");
var multer = require("multer");
//Set Image Storage
let storage = multer.diskStorage({
  destination: "./public/uploads/images/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb("Error: Please images only.");
  }
}

router.get("/", ImageController.home);
router.get("/uploads", ImageController.uploads);
router.post(
  "/upload-single",
  upload.single("singleImage"),
  ImageController.uploadsingle
);
router.post(
  "/upload-multiple",
  upload.array("multipleImage"),
  ImageController.uploadMultiple
);
router.delete("/delete/:id", ImageController.deleteImage);

module.exports = router;
