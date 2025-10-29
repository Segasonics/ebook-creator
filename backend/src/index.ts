import express, { NextFunction } from "express";
import { Response, Request } from "express";
import { config } from "dotenv";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db";
import rootRoute from "./routes/index";
import cookieParser from "cookie-parser";

config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/backend/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1", rootRoute);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
});

app.listen(8000, () => {
  console.log("Example app listening on port 3000!");
});
