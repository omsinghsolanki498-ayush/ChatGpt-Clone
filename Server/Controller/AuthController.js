const userModel = require("../model/user");  // database
const bcrypt = require("bcrypt"); // for password hashing
const jwt = require("jsonwebtoken"); // for create token
const cookieParser = require("cookie-parser"); // set cookie in user browser

// Register

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;  // comes form frontend

    // Validation
    if (!name || !email || !password) { // if any field is empty then show error
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check Existing User
    const existingUser = await userModel.findOne({ email }); // check email in database if exist then show error

    if (existingUser) { // if email exist then show error
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10); // hash password with bcrypt and salt rounds 10

    // Create User
    const user = await userModel.create({ // create user in database
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({  // if user created successfully then show success message
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//Login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;  // comes form frontend

    // Validation
    if (!email || !password) {  //if any field is empty then show error
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check User
    const existingUser = await userModel.findOne({ email });  // check email in database if not exist then show error

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(  // compare password with database password
      password, // password comes from frontend
      existingUser.password // password comes from database
    );

    if (!isMatch) { // if password not match then show error
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: existingUser._id , email: existingUser.email},  // create token with user._id and email
      process.env.JWT_SECRET, // secret key
      {expiresIn: "1d",}); // token expire in 1 day
      res.cookie("token",token, {  // set cookie in user browser with token
        httpOnly: true,  // for security
        secure: true, // Set to true in production
      });

    return res.status(200).json({  // if login successful then show success message with token and user data
      success: true, // for success response
      message: "Login successful",
      token,  // send token to frontend
      user: {  // send user data to frontend
        id: existingUser._id, // user id from database
        name: existingUser.name, // user name from database
        email: existingUser.email, // user email from database
      },
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { register, login };