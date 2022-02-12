const express = require("express");
const passport = require("passport");
require("../middleware/auth")(passport);
const {
  getAllUsers,
  addUser,
  getUserDetailWithId,
  login,
} = require("../services/user.service");

const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }), addUser);

router.get("/", passport.authenticate("jwt", { session: false }), getAllUsers);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getUserDetailWithId
);
router.post("/login", login);

module.exports = router;
