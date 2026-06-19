import jwt from "jsonwebtoken";
import User from "../db/user.js";

const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(
      decoded.userId
    ).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
      error: error.message,
    });
  }
};

export { verifyToken };