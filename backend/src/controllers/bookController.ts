import Book from "../models/Book";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { uploadOnCloudinary } from "../utils/cloudinary";

export const createBook = asyncHandler(async (req: Request, res: Response) => {
  const { title, author, subtitle, chapters } = req.body;
  if (!title || !author) {
    throw new ApiError(400, "All fields are required");
  }

  const book = await Book.create({
    userId: req.user._id,
    title,
    author,
    subtitle,
    chapters,
  });

  res.status(201).json(new ApiResponse(201, "Book created successfully", book));
});

export const getBooks = asyncHandler(async (req: Request, res: Response) => {
  const books = await Book.find({ userId: req.user._id });
  res
    .status(200)
    .json(new ApiResponse(200, "Books fetched successfully", books));
});

export const getBookById = asyncHandler(async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  if (book.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(401, "Unauthorized");
  }
  res.status(200).json(new ApiResponse(200, "Book fetched successfully", book));
});

export const updateBook = asyncHandler(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  if (!bookId) {
    throw new ApiError(404, "Book not found");
  }

  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  if (book.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(401, "Unauthorized");
  }

  const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
    new: true,
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Book updated successfully", updatedBook));
});

export const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  if (!bookId) {
    throw new ApiError(404, "Book not found");
  }
  const book = await Book.findByIdAndDelete(bookId);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  if (book.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(401, "Unauthorized");
  }
  res.status(200).json(new ApiResponse(200, "Book deleted successfully", book));
});

export const updateBookCover = asyncHandler(
  async (req: Request, res: Response) => {
    const bookId = req.params.id;
    if (!bookId) {
      throw new ApiError(404, "Book not found");
    }
    const book = await Book.findById(bookId);
    if (!book) {
      throw new ApiError(404, "Book not found");
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      throw new ApiError(401, "Unauthorized");
    }

    if (!req.file) {
      throw new ApiError(400, "Book cover image is required");
    }
    console.log("file", req.file);
    const imagePath = req.file.path.replace(/\\/g, "/");

    const image = await uploadOnCloudinary(imagePath);

    console.log("image", image);
    if (!image?.url) {
      throw new ApiError(400, "Book cover image is required");
    }

    book.coverImage = image?.url;
    await book.save();
    res
      .status(200)
      .json(
        new ApiResponse(200, "Book cover image updated successfully", book)
      );
  }
);
