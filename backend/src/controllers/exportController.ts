import { Response, Request } from "express";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  UnderlineType,
  ImageRun,
  PageBreakBefore,
} from "docx";
import PDFDocument from "pdfkit";
import MarkdownIt from "markdown-it";
import Book from "../models/Book";
import path from "path";
import fs from "fs";
import { asyncHandler } from "../utils/asyncHandler";

const md = new MarkdownIt();

const DOCX_STYLES = {
  fonts: {
    body: "Charter",
    heading: "Inter",
  },
  sizes: {
    title: 32,
    subtitle: 20,
    author: 18,
    chapterTitle: 24,
    h1: 20,
    h2: 18,
    h3: 16,
    body: 12,
  },
  spacing: {
    paragraphBefore: 200,
    paragraphAfter: 200,
    chapterBefore: 400,
    chapterAfter: 300,
    headingBefore: 300,
    headingAfter: 150,
  },
};

export const exportAsDocument = asyncHandler(
  async (req: Request, res: Response) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
      throw new Error("Book not found");
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      throw new Error("Unauthorized");
    }

    const sections = [];

    //Cover page with image if available
    const coverPage = [];

    if (book.coverImage && book.coverImage.includes("pravatar")) {
      const imagePath = book.coverImage.substring(1);

      try {
        if (fs.existsSync(imagePath)) {
          const imageBuffer = fs.readFileSync(imagePath);

          //Add some top spacing
          coverPage.push(
            new Paragraph({
              text: "",
              spacing: { before: 1000 },
            })
          );

          //Add image centered on page
          coverPage.push(
            new Paragraph({
              children: [
                new ImageRun({
                  data: imageBuffer,
                  transformation: { width: 500, height: 500 },
                  type: imagePath.endsWith(".png") ? "png" : "jpg",
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 400 },
            })
          );

          coverPage.push(
            new Paragraph({
              text: "",
              pageBreakBefore: true,
            })
          );
        }
      } catch (imgErr) {
        console.log(`Could not embed image ${imagePath}: ${imgErr}`);
      }
    }

    sections.push(...coverPage);

    //Title Page section
    const titlePage = [];

    //Main title
    titlePage.push(
      new Paragraph({
        children: [
          new TextRun({
            text: book.title,
            bold: true,
            font: DOCX_STYLES.fonts.heading,
            size: DOCX_STYLES.sizes.title * 2,
            color: "1A202C",
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { before: 2000, after: 200 },
      })
    );

    //Subtitle if exists
    if (book.subtitle && book.subtitle.trim()) {
      titlePage.push(
        new Paragraph({
          children: [
            new TextRun({
              text: book.subtitle,
              bold: true,
              font: DOCX_STYLES.fonts.heading,
              size: DOCX_STYLES.sizes.subtitle,
              color: "4A5568",
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        })
      );
    }
  }
);
