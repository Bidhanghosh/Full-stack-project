const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGN IN API
router.post("/sign-in", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    } else if (username.length < 4) {
      return res.status(400).json({ message: "Username must be at least 4 characters" });
    }

    // Check if the email already exists
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // If no errors, create a new user with the hashed password
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,  // Use the hashed password here
    });

    await newUser.save();
    return res.json({ message: "Sign In Successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// LOGIN API
router.post("/log-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Compare input password with stored hashed password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // If password matches, generate a JWT token
    const token = jwt.sign({ id: existingUser._id, username: username }, "tcmTM", { expiresIn: "2d" });

    // Respond with user ID and token
    return res.status(200).json({ id: existingUser._id, token: token });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
