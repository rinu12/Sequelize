const express = require("express");
const { createUser, listUsers } = require("../services/user.service");
const router = express.Router();

router.post("/createUser", createUser);
router.get("/listUsers", listUsers);

module.exports = router;
