const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup= async (req, res) => {
    try{
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  if(password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters long" });
  }
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ message: "Email already exists. Please login" });
  }
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return res.status(400).json({ message: "Username already taken." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword
});
  return res.status(201).json({ message: "User created successfully", user: {
        id: user._id,
        username: user.username,
        email: user.email
    } });
}catch (error) {
  console.error(error);
  return res.status(500).json({ message: "Internal server error" });
}
}
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found. Please signup." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
    {
        id: user._id
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"7d"
    }
);
    return res.status(200).json({ message: "Login successful", token, user: {
      id: user._id,
      username: user.username,
      email: user.email
    } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { signup, login };