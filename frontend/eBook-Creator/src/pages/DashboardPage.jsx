import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, Book } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";
import BookCard from "../components/cards/BookCard";
import CreateBookModal from "../components/modals/CreateBookModal";

const BookCardSkeleton = () => (
  <div className="animate-pulse rounded-2xl border border-slate-200/70 bg-white overflow-hidden">
    <div className="w-full h-44 sm:h-48 bg-slate-200"></div>
    <div className="p-3">
      <div className="h-4 w-3/4 bg-slate-200 mb-2 rounded"></div>
      <div className="h-3 w-1/2 bg-slate-200 rounded"></div>
    </div>
  </div>
);

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div
          className="fixed inset-0 bg-black/50 opacity-25 transition-opacity"
          onClick={onClose}
        ></div>
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
          <p className="text-slate-600 mb-6">{message}</p>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log(books);
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(API_PATHS.BOOKS.GET_BOOKS);
        setBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDeleteBook = async () => {
    if (!bookToDelete) return;

    try {
      await axiosInstance.delete(
        `${API_PATHS.BOOKS.DELETE_BOOK}/${bookToDelete}`
      );
      setBooks(books.filter((book) => book._id !== bookToDelete));
      toast.success("Book deleted successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete book. Please try again."
      );
    } finally {
      setBookToDelete(null);
    }
  };

  const creditsLeft =
    user?.isPro ? Number.POSITIVE_INFINITY : user?.credits ?? 0;
  const isFreeLimitReached = !user?.isPro && creditsLeft <= 0;

  const handleCreateBookClick = () => {
    if (isFreeLimitReached) {
      toast.error(
        "Free plan credits exhausted. Credits reset monthly. Upgrade to Pro for unlimited books."
      );
      return;
    }
    setIsCreateModalOpen(true);
  };

  const handleBookCreated = (bookId) => {
    setIsCreateModalOpen(false);
    navigate(`/editor/${bookId}`);
  };
  return (
    <DashboardLayout>
      <div className="relative">
        <div className="container mx-auto py-8 px-6 lg:px-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">
                Your Library
              </p>
            <h1 className="text-3xl md:text-4xl font-book font-semibold text-slate-900 mt-2">
              All eBooks
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Create, edit, and manage your AI-crafted books with a clean,
              modern workspace designed for focus.
            </p>
          </div>
          <Button
            className={`whitespace-nowrap shadow-[0_10px_20px_-12px_rgba(79,70,229,0.6)] ${
              isFreeLimitReached ? "opacity-60 cursor-not-allowed" : ""
            }`}
            onClick={handleCreateBookClick}
            icon={Plus}
            aria-disabled={isFreeLimitReached}
            title={
              isFreeLimitReached
                ? "Free plan credits exhausted. Credits reset monthly."
                : undefined
            }
          >
            Create New
          </Button>
        </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(8)].map((_, index) => (
                <BookCardSkeleton key={index} />
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="flex flex-col items-center gap-4 justify-center py-14 text-center border border-slate-200/70 rounded-3xl bg-white/80 backdrop-blur-sm">
              <div className="w-16 h-16 flex items-center justify-center bg-slate-100 rounded-full">
                <Book className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                No eBooks yet
              </h3>
              <p className="text-sm text-slate-600 max-w-md">
                Start your library by creating a new book. We will format and
                organize everything for you.
              </p>
              <Button onClick={handleCreateBookClick} icon={Plus}>
                Create your first eBook
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {books?.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onDelete={() => setBookToDelete(book._id)}
                />
              ))}
            </div>
          )}
        <ConfirmationModal
          isOpen={!!bookToDelete}
          onClose={() => setBookToDelete(null)}
          onConfirm={handleDeleteBook}
          title="Delete Book"
          message="Are you sure you want to delete this book?"
        />

        <CreateBookModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onBookCreated={handleBookCreated}
          isLimitReached={isFreeLimitReached}
        />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
