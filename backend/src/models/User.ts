import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser, IUserMethods } from "../types/user";

// “This Mongoose model works with documents shaped like IUser,
// and those documents also have extra methods defined in IUserMethods.”
type IUserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    avatar: {
      type: String,
      default: "",
    },
    isPro: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function (id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};

const User = mongoose.model<IUser, IUserModel>("User", userSchema);
export default User;
