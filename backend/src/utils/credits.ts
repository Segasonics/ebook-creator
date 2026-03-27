import { IUser } from "../types/user";
import { Document } from "mongoose";

type UserDoc = Document & IUser;

export const ensureMonthlyCredits = async (user: UserDoc) => {
  if (user.isPro) {
    return user;
  }

  const now = new Date();
  const lastReset = user.creditsResetAt ? new Date(user.creditsResetAt) : null;
  const needsReset =
    !lastReset ||
    lastReset.getUTCFullYear() !== now.getUTCFullYear() ||
    lastReset.getUTCMonth() !== now.getUTCMonth();

  if (needsReset) {
    user.credits = 5;
    user.creditsResetAt = now;
    await user.save();
  }

  return user;
};
