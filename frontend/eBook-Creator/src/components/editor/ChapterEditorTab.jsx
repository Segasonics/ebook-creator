import React, { use, useMemo, useState } from "react";
import { Sparkles, Type, Eye, Maximize2 } from "lucide-react";
import Button from "../ui/Button";
import InputField from "../ui/InputField";
import SimpleMDEditor from "./SimpleMDEditor";

const ChapterEditorTab = ({
  book = {
    title: "Untitled",
    chapters: [
      {
        title: "Chapter 1",
        description: "-",
      },
    ],
  },
  selectedChapterIndex = 0,
  onChapterChange = () => {},
  onGenerateChapterContent = () => {},
  isGenerating,
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  //Simple markdown parser
  const formatMarkdown = (content) => {
    return (
      content
        //Headers
        .replace(
          /^### (.*$)/gm,
          '<h3 class="text-xl font-bold mb-4 mt-6">$1</h3>'
        )
        .replace(
          /^## (.*$)/gm,
          '<h2 class="text-2xl font-bold mb-4 mt-6">$2</h2>'
        )
        .replace(
          /^# (.*$)/gm,
          '<h1 class="text-3xl font-bold mb-4 mt-6">$3</h1>'
        )

        //Bold and Italic
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

        //Blockquotes
        .replace(
          /^> (.*$)/gm,
          '<blockquote class="border-l-4 border-violet-500 pl-4 italic text-gray-700 my-4">$1</blockquote>'
        )

        //Unordered Lists
        .replace(/^\- (.*$)/gm, '<li class="ml-4 mb-1">$1</>')
        .replace(/(<li.*<\/li>)/gs, '<ul class="my-4">$1</ul>')

        //Ordered Lists
        .replace(/^\d+\.(.*$)/gm, '<li class="ml-4 mb-1 list-decimal">$1</>')
        .replace(
          /(<li class="ml-4 mb-1 list-decimal".*<\/li>)/gs,
          '<ol class="my-4 ml-4">$1</ol>'
        )

        //Paragraphs
        .split("\n\n")
        .map((paragraph) => {
          paragraph = paragraph.trim();
          if (!paragraph) return "";
          //skip if already wrapped in html tags
          if (paragraph.startsWith("<") && paragraph.endsWith(">"))
            return paragraph;
          return `<p class="mb-4 text-justify">${paragraph}</p>`;
        })
        .join("")
    );
  };

  const mdeOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "code",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "image",
        "table",
        "|",
        "preview",
        "fullscreen",
        "guide",
      ],
    };
  }, []);

  if (selectedChapterIndex === null || !book.chapters[selectedChapterIndex]) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Type className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">
            Select a chapter to start editing
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Choose from the sidebar to begin writing
          </p>
        </div>
      </div>
    );
  }

  const currentChapter = book.chapters[selectedChapterIndex];
  return (
    <div
      className={`${
        isFullScreen ? "fixed inset-0 z-50 bg-white" : "flex-1"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 justify-between">
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                Chapter Editor
              </h1>
              <p className="text-sm md:text-base text-gray-500 mt-1">
                Editing :{" "}
                {currentChapter.title || `Chapter ${selectedChapterIndex + 1} `}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Editor Control */}
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setIsPreviewMode(false)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    !isPreviewMode
                      ? "bg-violet-50 text-violet-600 border-r border-violet-200"
                      : "text-slate-600 hover:bg-gray-50"
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setIsPreviewMode(true)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isPreviewMode
                      ? "bg-violet-50 text-violet-700"
                      : "text-slate-600 hover:bg-gray-50"
                  }`}
                >
                  Preview
                </button>
              </div>

              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                title="Toggle Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <Button
                onClick={() => onGenerateChapterContent(selectedChapterIndex)}
                isLoading={isGenerating === selectedChapterIndex}
                icon={Sparkles}
                size="sm"
              >
                Generate with AI
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full bg-white px-8 py-6">
          <div className="h-full bg-white">
            <div className="space-y-6 h-full flex flex-col">
              {/* Chapter Title */}
              <div>
                <InputField
                  label={"Chapter Title"}
                  name="title"
                  value={currentChapter.title || ""}
                  onChange={onChapterChange}
                  placeholder="Enter chapter title"
                  className="text-xl font-semibold"
                />
              </div>

              {/* Editor/Preview Area */}
              <div className="">
                {isPreviewMode ? (
                  <div className="">
                    <div className="">
                      <div className="">
                        <Eye className="" />
                        <span>Preview Mode</span>
                      </div>
                    </div>
                    <div className="">
                      <h1 className="">
                        {currentChapter.title || `Untitled Chapter `}
                      </h1>
                      <div
                        className=""
                        style={{
                          fontFamily:
                            'Charter,Georgia, "Times New Roman", Times, serif',
                          lineHeight: 1.6,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: currentChapter.content
                            ? formatMarkdown(currentChapter.content)
                            : '<p class="text-gray-400 italic">No content yet</p></p>',
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <SimpleMDEditor
                      value={currentChapter.content || ""}
                      onChange={(value) =>
                        onChapterChange({ target: { name: "content", value } })
                      }
                      options={mdeOptions}
                    />
                  </div>
                )}
              </div>

              {/* Status bar */}
              <div className="">
                <div className="">
                  <span>
                    Words :{" "}
                    {currentChapter.content
                      ? currentChapter.content
                          .split(/\s+/)
                          .filter((word) => word.length > 0).length
                      : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterEditorTab;
