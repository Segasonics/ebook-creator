import express from "express";
import authRoute from "./authRoute.js";
import aiRoute from "./aiRoute.js";
import bookRoute from "./bookRoute.js";
import exportRoute from "./exportRoute.js";
import chatRoute from "./chatRoute.js";

const rootRoute = express.Router();

rootRoute.use("/auth", authRoute);
rootRoute.use("/ai", aiRoute);
rootRoute.use("/book", bookRoute);
rootRoute.use("/export", exportRoute);
rootRoute.use("/chat", chatRoute);

export default rootRoute;
