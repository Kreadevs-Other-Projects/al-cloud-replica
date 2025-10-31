import User from "../models/User.js";
import jwt from "jsonwebtoken";

const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role, phone });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: genToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: genToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};
