
const express = require("express");
const { login } = require("../controllers/authController");
const loginLimiter = require("../middleware/loginLimiter");

const router = express.Router();

router.post("/login", loginLimiter, login);

module.exports = router;
