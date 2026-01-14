export const API_PATHS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    PROFILE: "/auth/profile",
  },
  BOOKS: {
    CREATE_BOOK: "/book",
    GET_BOOKS: "/book",
    GET_BOOK_BY_ID: "/book",
    UPDATE_BOOK: "/book",
    DELETE_BOOK: "/book",
    UPDATE_BOOK_COVER: "/book",
  },
  AI: {
    GENERATE_OUTLINE: "/ai/generate-outline",
    GENERATE_CHAPTER_CONTENT: "/ai/generate-chapter-content",
  },
  EXPORT: {
    PDF: "/export",
    DOC: "/export",
  },
  CHAT: {
    AI: "/chat/ai",
  },
};

export const BASE_URL = "http://localhost:8000";
