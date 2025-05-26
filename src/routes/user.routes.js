const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const { verifyToken } = require("../utils/token.js");
const multer = require("multer");

// Multer config with diskStorage, file filter and limits
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
});

router.get("/profile", verifyToken, userController.getProfile);

router.patch(
  "/profile",
  verifyToken,
  upload.single("avatar"),
  userController.updateProfile
);

router.post("/logout", verifyToken, userController.logout);

module.exports = router;
