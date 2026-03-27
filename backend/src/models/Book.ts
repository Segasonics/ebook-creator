import { IChapter, IBook } from "../types/book";
import mongoose, { Schema } from "mongoose";

const chapterSchema = new Schema<IChapter>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
});

const bookSchema = new Schema<IBook>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    descriptionLocked: {
      type: Boolean,
      default: false,
    },
    author: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: "",
    },
    chapters: [chapterSchema],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    ratingAverage: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model<IBook>("Book", bookSchema);
export default Book;
