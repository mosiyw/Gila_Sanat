const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { phone_number, username, password } = req.body;

    // Check if the phone_number is already taken
    const existingEmailUser = await User.findOne({ phone_number });

    // Check if the username is already taken
    const existingUsernameUser = await User.findOne({ username });

    if (existingEmailUser && existingUsernameUser) {
      return res
        .status(400)
        .json({ error: "phone_number and username already exist" });
    } else if (existingEmailUser) {
      return res.status(400).json({ error: "phone_number already exists" });
    } else if (existingUsernameUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      phone_number,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone_number, password } = req.body;

    // Find the user by phone_number
    const user = await User.findOne({ phone_number });

    if (!user) {
      return res.status(401).json({ error: "phone_number is incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Password is incorrect" });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "48h",
      }
    );

    // Prepare the response object
    const responseData = {
      message: "Login successful",
      token,
    };

    if (user.isAdmin) {
      // If the user is an admin, include isAdmin in the response
      responseData.isAdmin = true;
    }

    // Set the token as a cookie with httpOnly and secure options
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Set this to true if your application is served over HTTPS
      sameSite: "none", // Set this according to your cookie requirements
    });

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "_id username firstname lastname phone_number email"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.password; // Prevent password updates

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, updates, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.logout = (req, res) => {
  // Destroy the session or remove user information
  req.session = null;
  res.json({ message: "Logout successful" });
};
