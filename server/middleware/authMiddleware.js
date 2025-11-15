import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "cloudcare");
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (err) {
      console.error("🔥 Token verification failed:", err);
      return next(new Error("Not authorized, token failed"));
    }
  } else {
    return next(new Error("Not authorized, no token"));
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return next(new Error("Admin access only"));
};
