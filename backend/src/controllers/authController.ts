import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Request, Response } from "express";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new ApiError(400, "User already exists");
    }

    const user = await User.create({ name, email, password });

    const token = user.generateToken(user._id.toString());

    const findUser = await User.findById(user._id).select("-password");
    if (!findUser) {
      throw new ApiError(400, "User not found");
    }

    res
      .status(201)
      .cookie("token", token, { httpOnly: true })
      .json(new ApiResponse(200, "User created successfully", findUser, token));
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const token = user.generateToken(user._id.toString());
  const isValidPassword = await user?.comparePassword(password);
  if (!isValidPassword) {
    throw new ApiError(400, "Invalid password");
  }

  console.log(isValidPassword);

  const findUser = await User.findById(user._id).select("-password");
  res
    .status(200)
    .json(new ApiResponse(200, "User logged in successfully", findUser, token));
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const user = await User.findById(userId).select("-password");
  res.status(200).json(new ApiResponse(200, "User profile", user));
});

export const updateUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res
      .status(200)
      .json(new ApiResponse(200, "User profile updated", updatedUser));
  }
);
