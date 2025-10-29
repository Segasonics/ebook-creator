import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { PromptTemplate } from "@langchain/core/prompts";
import { Response, Request } from "express";
import { ChatOpenAI } from "@langchain/openai";
import {
  JsonOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { ApiResponse } from "../utils/ApiResponse";

export const generateOutline = asyncHandler(
  async (req: Request, res: Response) => {
    const { topic, style, numChapters, description } = req.body;

    if (!topic) {
      throw new ApiError(400, "Topic is required");
    }
    const promptTemplate = new PromptTemplate({
      template: `
You are an expert book planner.
Generate a detailed outline for a book on the topic: "{topic}".

- The book should have {numChapters} chapters.
- The writing style should be {style}.
- Description or additional details: {description}.

Return the result strictly in JSON format, following this structure:
[
  {{ "title": "Chapter 1: Introduction to {topic}", "description": "Brief overview of the topic." }},
  {{ "title": "Chapter 2: Core Principles", "description": "Explain the main concepts." }}
]`,
      inputVariables: ["topic", "numChapters", "style", "description"],
    });

    const formattedPrompt = promptTemplate.format({
      topic,
      numChapters,
      style,
      description,
    });
    console.log(formattedPrompt);
    const llm = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0.5,
      maxTokens: 500,
    });

    const outputParser = new JsonOutputParser();

    const lcelChain = RunnableSequence.from([
      promptTemplate,
      llm,
      outputParser,
    ]);

    const result = await lcelChain.invoke({
      topic,
      numChapters,
      style,
      description,
    });
    console.log(result);
    res.status(200).json(new ApiResponse(200, "Outline generated", result));
  }
);

export const generateChapterContent = asyncHandler(
  async (req: Request, res: Response) => {
    const { chapterTitle, chapterDescription, style } = req.body;

    if (!chapterTitle) {
      throw new ApiError(400, "Please provide a chapter title");
    }

    const promptTemplate = new PromptTemplate({
      template: `You are an expert writer specialist in {style} writing.Write a complete chapter for a book with the following
        specifications:
        Chapter Title: {chapterTitle}
        Chapter Description: {chapterDescription}
        Writing Style: {style}
        Target Length: 1000-1500 words
        Requirements:
        1. The chapter should be written in {style} style.
        2.Structure the content with clear sections and smooth transitions.
        3. The chapter should be engaging and engaging.
        4.Include relevant examples and illustrations to support your points.
        5.Make the chapter engaging and interesting.
        6.Cover all the topics mentioned in the chapter description.
        
        Format Guidelines:
        -Start with a compelling opening paragraph
        -Use clear and concise language.
        -Include relevant examples and illustrations to support your points.
        -End with a strong conclusion or transition to the next chapter.
        -Write in plain text without markdown formatting.
        
        Begin writing the chapter content now :`,
      inputVariables: ["chapterTitle", "chapterDescription", "style"],
    });

    const formattedPrompt = promptTemplate.format({
      chapterTitle,
      chapterDescription,
      style,
    });
    console.log(formattedPrompt);
    const llm = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0.5,
      maxTokens: 500,
    });

    const outputParser = new StringOutputParser();

    const lcelChain = RunnableSequence.from([
      promptTemplate,
      llm,
      outputParser,
    ]);

    const result = await lcelChain.invoke({
      chapterTitle,
      chapterDescription,
      style,
    });
    console.log(result);
    res.status(200).json(new ApiResponse(200, "Content generated", result));
  }
);
