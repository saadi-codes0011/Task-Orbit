const express = require("express");
const router = express.Router();
const {
    getProfile,
    updateProfile,
    getUsers,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const { upload } = require("../config/cloudinary");

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, upload.single("profilePic"), updateProfile);
router.get("/", authMiddleware, getUsers);

module.exports = router;