import { IUser } from "./user"; // adjust path if needed

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};
