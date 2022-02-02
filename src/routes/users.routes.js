const express = require("express");
const { createUser, listUsers, login } = require("../services/user.service");
const router = express.Router();

router.post("/createUser", createUser);
router.get("/listUsers", listUsers);
router.post("/login", login);

module.exports = router;
