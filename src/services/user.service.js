const User = require("../models/users");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
exports.createUser = async (req, res) => {
  // const email = req.body.email;

  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(12);
  const passwordEncrypted = await bcrypt.hash(password, salt);
  const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (alreadyExistsUser) {
    return res.status(409).json({ message: "User with email already exists!" });
  }

  const newUser = new User({ email, password: passwordEncrypted, salt });
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot register user at the moment!" });
  });

  if (savedUser) res.json({ message: "Thanks for registering" });
};

exports.listUsers = async (req, res) => {
  const user = await User.findAll();
  if (user) {
    res.status(200).json({ data: user });
  }
  if (!user) {
    res.status(400).json({ message: "Error Occured" });
  }
};
