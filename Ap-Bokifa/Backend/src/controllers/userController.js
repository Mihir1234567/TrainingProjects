import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================================
// REGISTER USER
// ================================
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await userModel.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to register user",
      error: error.message,
    });
  }
};

// ================================
// LOGIN USER
// ================================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.toLowerCase();

    const user = await userModel.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        cart: user.cart,
        wishlist: user.wishlist,
        compare: user.compare,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to login user",
      error: error.message,
    });
  }
};

// ================================
// SYNC USER DATA
// ================================
const syncUserData = async (req, res) => {
  try {
    const userId = req.user._id; // from protect middleware
    const { cart, wishlist, compare } = req.body;

    const updates = {};
    if (cart) updates.cart = cart;
    if (wishlist) updates.wishlist = wishlist;
    if (compare) updates.compare = compare;

    const user = await userModel.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    res.status(200).json({
      success: true,
      data: {
        cart: user.cart,
        wishlist: user.wishlist,
        compare: user.compare,
      },
    });
  } catch (error) {
    console.error("Sync error:", error);
    res.status(500).json({ success: false, message: "Sync failed" });
  }
};

const getUserData = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    res.status(200).json({
      success: true,
      data: {
        cart: user.cart,
        wishlist: user.wishlist,
        compare: user.compare,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
};

export default {
  register,
  login,
  syncUserData,
  getUserData,
};
