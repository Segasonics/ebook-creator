export interface InlineChild {
  type: "text" | "strong_open" | "strong_close" | "em_open" | "em_close";
  content?: string;
}

export interface FormattingState {
  bold: boolean;
  italic: boolean;
}
