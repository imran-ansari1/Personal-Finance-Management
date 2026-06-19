import User from "../db/user.js";
import bcrypt from "bcrypt";

const generateAccessandRefreshTokeens=async (user_id)=>{
  try {
    const user = await User.findById(user_id);
    if (!user) {
      throw new Error("User not found");
    }
    const accessToken = user.generateAccessToken();
    console.log("Generating access token");
    const refreshToken = user.generateRefreshToken();
    console.log("Generating refresh token");

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });


    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Error generating tokens"); 
  }
}
const createUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    if (
      [name, email, phoneNumber, password].some(
        (field) => !field || (typeof field === "string" && field.trim() === ""),
      )
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userexist = await User.findOne({
      $or: [{ phoneNumber }, { email }],
    });

    if (userexist) {
      return res.status(500).json({ message: "user already exist" });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, phoneNumber, password });


    return res.status(201).json({ message: "User created", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const login_user = async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body;
    

    if ((!email && !phoneNumber) || !password) {
      return res.status(400).json({
        message: "Email or phone number and password are required",
      });
    }

    const user = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    console.log(user,"user found ");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    console.log("Request Password:", password);
console.log("Stored Hash:", user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
const { accessToken, refreshToken } =
  await generateAccessandRefreshTokeens(user._id);

const options = {
  httpOnly: true,
  secure: false, // localhost par false rakho
};

return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json({
    message: "Login successful",
    user,
    accessToken,
    refreshToken,
  });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const logout_user = async (req, res) => {
  User.findByIdAndUpdate(req.user._id, { refreshToken: null }, { new: true })
    .then(() => {
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      res.status(200).json({ message: "Logout successful" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error", error: error.message });
    }); 
}




export { createUser, login_user, logout_user };