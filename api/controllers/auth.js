import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.username) {
      // Duplicate key error for the 'username' field
      res.status(400).json({ success: false, message: 'Username is already taken' });
    } else {
      // Handle other errors
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    next(err);
  }
}
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res, next) => {
  try {
    // Clear the cookie containing the access token
    res.clearCookie("access_token");

    res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (err) {
    next(err);
  }
};
