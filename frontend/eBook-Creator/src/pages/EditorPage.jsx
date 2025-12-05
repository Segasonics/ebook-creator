import React, { useEffect, useState, useRef, act } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Sparkles,
  FileDown,
  Save,
  Menu,
  X,
  Edit,
  NotebookText,
  ChevronDown,
  FileText,
  Book,
} from "lucide-react";
import { arrayMove } from "@dnd-kit/sortable";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";
import Dropdown, { DropdownItem } from "../components/ui/Dropdown";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import SelectField from "../components/ui/SelectField";
import ChapterSidebar from "../components/editor/ChapterSidebar";
import ChapterEditorTab from "../components/editor/ChapterEditorTab";
import BookDetailsTab from "../components/editor/BookDetailsTab";

const EditorPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("editor");
  const fileInputRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  console.log(book);

  //AI modal state
  const [isOutlineModalOpen, setIsOutlineModalOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiStyle, setAiStyle] = useState("Informative");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_PATHS.BOOKS.GET_BOOK_BY_ID}/${bookId}`
        );
        setBook(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching book:", error);
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [bookId, navigate]);

  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleChapterChage = (e) => {};

  const handleAddChapter = () => {};

  const handleDeleteChapter = (index) => {};

  const handleReorderChapters = (oldIndex, newIndex) => {};

  const handleSaveChanges = async (bookToSave = book, showToast = true) => {};

  const handleCoverImageUpload = async (e) => {};

  const handleGenerateOutline = async () => {};

  const handleGenerateChapterContent = async (index) => {};

  const hadleExportPDF = async () => {};

  const handleExportDoc = async () => {};

  if (isLoading || !book) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading Editor...</p>
      </div>
    );
  }
  return (
    <>
      <div className="flex bg-slate-50 font-sans relative min-h-screen">
        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 flex md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-black/20 bg-opacity-75"
              aria-hidden="true"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="sr-only">Close Sidebar</span>
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              <ChapterSidebar
                book={book}
                selectedChapterIndex={selectedChapterIndex}
                onSelectChapter={(index) => {
                  setSelectedChapterIndex(index);
                  setIsSidebarOpen(false);
                }}
                onAddChapter={handleAddChapter}
                onDeleteChapter={handleDeleteChapter}
                onGenerateChapterContent={handleGenerateChapterContent}
                isGenerating={isGenerating}
                onReorderChapters={handleReorderChapters}
              />
            </div>
            <div className="shrink-0 w-14" aria-hidden="true"></div>
          </div>
        )}

        {/* Desktop sidebar */}
        <div className="hidden md:flex md:shrink-0 sticky top-0 h-screen ">
          <ChapterSidebar
            book={book}
            selectedChapterIndex={selectedChapterIndex}
            onSelectChapter={(index) => {
              setSelectedChapterIndex(index);
            }}
            onAddChapter={handleAddChapter}
            onDeleteChapter={handleDeleteChapter}
            onGenerateChapterContent={handleGenerateChapterContent}
            isGenerating={isGenerating}
            onReorderChapters={handleReorderChapters}
          />
        </div>

        <main className="flex-1 h-full flex flex-col">
          <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-slate-200 p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button onClick={() => setIsSidebarOpen(true)} className="">
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden sm:flex space-x-1 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab("editor")}
                  className={`flex items-center justify-center flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
                    activeTab === "editor"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editor
                </button>
                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex items-center justify-center flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap ${
                    activeTab === "details"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <NotebookText className="w-4 h-4 mr-2" />
                  Book Details
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Dropdown
                trigger={
                  <Button variant="secondary" icno={FileDown}>
                    Export
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                }
              >
                <DropdownItem onClick={hadleExportPDF}>
                  <FileText className="w-4 h-4 mr-2 text-slate-500" />
                  Export as PDF
                </DropdownItem>
                <DropdownItem onClick={handleExportDoc}>
                  <FileText className="w-4 h-4 mr-2 text-slate-500" />
                  Export as Document
                </DropdownItem>
              </Dropdown>

              <Button
                onClick={() => handleSaveChanges()}
                isLoading={isSaving}
                icon={Save}
              >
                Save Changes
              </Button>
            </div>
          </header>

          <div className="w-full">
            {activeTab === "editor" ? (
              <ChapterEditorTab
                book={book}
                selectedChapterIndex={selectedChapterIndex}
                onChapterChange={handleChapterChage}
                onGenerateChapterContent={handleGenerateChapterContent}
                isGenerating={isGenerating}
              />
            ) : (
              <BookDetailsTab
                book={book}
                onBookChange={handleBookChange}
                onCoverUpload={handleCoverImageUpload}
                isUploading={isUploading}
                fileInputRef={fileInputRef}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default EditorPage;
