import express from "express";
import authRoute from "./authRoute";
import aiRoute from "./aiRoute";
import bookRoute from "./bookRoute";
import exportRoute from "./exportRoute";

const rootRoute = express.Router();

rootRoute.use("/auth", authRoute);
rootRoute.use("/ai", aiRoute);
rootRoute.use("/book", bookRoute);
rootRoute.use("/export", exportRoute);

export default rootRoute;
