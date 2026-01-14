import { asyncHandler } from "../utils/asyncHandler";
import { Response, Request } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import axios from "axios";

export const chatBox = asyncHandler(async (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message) {
    throw new ApiError(400, "Message is required");
  }

  const data = await axios.post(process.env.N8N_URL!, {
    message,
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Message sent successfully", data.data));
});
