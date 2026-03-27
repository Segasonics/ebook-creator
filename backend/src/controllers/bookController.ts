import Book from "../models/Book.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Request, Response } from "express";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

export const createBook = asyncHandler(async (req: Request, res: Response) => {
  const { title, author, subtitle, chapters } = req.body;
  if (!title || !author) {
    throw new ApiError(400, "All fields are required");
  }

  if (!req.user.isPro) {
    if (req.user.credits <= 0) {
      throw new ApiError(
        403,
        "Free plan credits exhausted. Credits reset monthly. Upgrade to Pro for unlimited books."
      );
    }
  }

  const book = await Book.create({
    userId: req.user._id,
    title,
    author,
    subtitle,
    chapters,
  });

  if (!req.user.isPro) {
    req.user.credits = Math.max(0, req.user.credits - 1);
    await req.user.save();
  }

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

  if (req.body?.status === "published" && !req.user.isPro) {
    throw new ApiError(
      403,
      "Publishing is available on Pro. Upgrade to publish your book."
    );
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

export const generateBookDescription = asyncHandler(
  async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      throw new ApiError(404, "Book not found");
    }
    if (book.userId.toString() !== req.user._id.toString()) {
      throw new ApiError(401, "Unauthorized");
    }
    if (book.descriptionLocked) {
      throw new ApiError(
        403,
        "Description is locked. Unlock it to regenerate with AI."
      );
    }

    const chapterTitles = (book.chapters || [])
      .slice(0, 8)
      .map((ch) => ch.title)
      .join(", ");

    const promptTemplate = new PromptTemplate({
      template: `You are a professional book editor. Write a short, engaging description for a public library listing.
- Title: {title}
- Subtitle: {subtitle}
- Author: {author}
- Chapter topics: {chapters}
Rules:
1) 1-2 sentences, max 280 characters.
2) Plain text only. No quotes or markdown.
3) Focus on the reader benefit and topic clarity.`,
      inputVariables: ["title", "subtitle", "author", "chapters"],
    });

    const llm = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0.5,
      maxTokens: 120,
    });

    const outputParser = new StringOutputParser();
    const lcelChain = RunnableSequence.from([
      promptTemplate,
      llm,
      outputParser,
    ]);

    const result = await lcelChain.invoke({
      title: book.title,
      subtitle: book.subtitle || "",
      author: book.author,
      chapters: chapterTitles || "Not provided",
    });

    book.description = (result || "").trim();
    await book.save();

    res
      .status(200)
      .json(new ApiResponse(200, "Description generated", book));
  }
);

export const getPublishedBooks = asyncHandler(
  async (_req: Request, res: Response) => {
    const books = await Book.find({ status: "published" }).sort({
      updatedAt: -1,
    });
    res
      .status(200)
      .json(new ApiResponse(200, "Published books fetched successfully", books));
  }
);

export const getPublishedBookById = asyncHandler(
  async (req: Request, res: Response) => {
    const book = await Book.findOne({
      _id: req.params.id,
      status: "published",
    });
    if (!book) {
      throw new ApiError(404, "Published book not found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, "Published book fetched successfully", book));
  }
);

export const ratePublishedBook = asyncHandler(
  async (req: Request, res: Response) => {
    const { rating } = req.body;
    const numericRating = Number(rating);
    if (!numericRating || numericRating < 1 || numericRating > 5) {
      throw new ApiError(400, "Rating must be between 1 and 5.");
    }

    const book = await Book.findOne({
      _id: req.params.id,
      status: "published",
    });
    if (!book) {
      throw new ApiError(404, "Published book not found");
    }

    book.ratingCount = (book.ratingCount || 0) + 1;
    const total = (book.ratingAverage || 0) * (book.ratingCount - 1);
    book.ratingAverage = Number(
      ((total + numericRating) / book.ratingCount).toFixed(1)
    );
    await book.save();

    res
      .status(200)
      .json(new ApiResponse(200, "Rating submitted", book));
  }
);
