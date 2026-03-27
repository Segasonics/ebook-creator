import mongoose from "mongoose";

export interface IChapter {
  title: string;
  description: string;
  content: string;
}

export interface IBook {
  userId: mongoose.Schema.Types.ObjectId | string;
  title: string;
  subtitle: string;
  description: string;
  descriptionLocked: boolean;
  author: string;
  chapters: IChapter[];
  coverImage: string;
  status: string;
  ratingAverage: number;
  ratingCount: number;
}
