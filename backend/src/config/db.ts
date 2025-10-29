import mongoose from "mongoose";

export const connectDB: () => Promise<void> = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
