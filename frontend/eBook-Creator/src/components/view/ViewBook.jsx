import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, Menu, Maximize2, Minimize2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import ViewChapterSidebar from "./ViewChapterSidebar";

const ViewBook = ({ book }) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const navigate = useNavigate();
  const location = useLocation();
  const isPublic = location.pathname.startsWith("/library");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const selectedChapter = book.chapters[selectedChapterIndex];

  //Format content with proper paragraphs and styling

  const formatContent = (content) => {
    return content
      .split("\n\n")
      .filter((paragraph) => paragraph.trim())
      .map((paragraph) => paragraph.trim())
      .map((paragraph) => {
        paragraph = paragraph.replace(
          /\*\*(.*?)\*\*/g,
          '<strong class="font-semibold">$1</strong>'
        );
        paragraph = paragraph.replace(
          /(?<!\*)\*(.*?)\*(?!\*)/g,
          '<em class="italic">$1</em>'
        );
        return `<p>${paragraph}</p>`;
      })
      .join("");
  };
  const handleToggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen not supported:", error);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex ${
        isFullscreen ? "h-screen" : "h-[calc(100vh-64px)]"
      } bg-white text-gray-900`}
    >
      <ViewChapterSidebar
        book={book}
        selectedChapterIndex={selectedChapterIndex}
        onSelectChapter={setSelectedChapterIndex}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        topOffsetClass={
          isPublic && !isFullscreen ? "top-20 lg:top-0" : "top-0"
        }
        heightClass={
          isPublic && !isFullscreen ? "h-[calc(100vh-80px)] lg:h-full" : "h-full"
        }
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-semibold text-base md:text-lg truncate">
                {book.title}
              </h1>
              <p className="text-sm text-gray-500">by {book.author}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Font size controls */}
            <div className="flex items-center gap-2 mr-4">
              <button
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-sm font-bold"
              >
                A-
              </button>
              <span className="text-sm text-gray-500">{fontSize}px</span>
              <button
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-sm font-bold"
              >
                A+
              </button>
            </div>
            <button
              onClick={handleToggleFullscreen}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </header>
        {/* Reading Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 py-12">
            {/* Chapter Title */}
            <h1 className="text-xl md:text-3xl font-bold mb-8 leading-tight">
              {selectedChapter.title}
            </h1>
            {/* Chapter Content */}
            <div
              className="reading-content"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: 1.7,
                fontFamily: "Chater,Georgia,Times New Roman, Times, serif",
              }}
              dangerouslySetInnerHTML={{
                __html: formatContent(selectedChapter.content),
              }}
            />
            {/* Navigation */}
            <div
              className={`flex justify-between items-center mt-16 pt-18 border-t border-gray-200 ${
                isPublic
                  ? "sticky bottom-0 bg-white/95 backdrop-blur-sm py-4"
                  : ""
              }`}
            >
              <button
                onClick={() =>
                  setSelectedChapterIndex(Math.max(0, selectedChapterIndex - 1))
                }
                disabled={selectedChapterIndex === 0}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <span className="text-sm text-gray-500">
                {selectedChapterIndex + 1} of {book.chapters.length}
              </span>

              <button
                onClick={() =>
                  setSelectedChapterIndex(
                    Math.min(book.chapters.length - 1, selectedChapterIndex + 1)
                  )
                }
                disabled={selectedChapterIndex === book.chapters.length - 1}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewBook;
