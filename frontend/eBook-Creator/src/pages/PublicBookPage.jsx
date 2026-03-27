import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/layout/Navbar";
import ViewBook from "../components/view/ViewBook";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";
import { Book, Star } from "lucide-react";
import { resolveImageUrl } from "../utils/imageUrl";
import { useAuth } from "../context/AuthContext";

const PublicBookPage = () => {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const { bookId } = useParams();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `${API_PATHS.PUBLIC.BOOKS}/${bookId}`
        );
        setBook(response.data.data);
      } catch (error) {
        console.error("Error fetching published book:", error);
        toast.error("Error fetching book");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleRate = async (value) => {
    if (!isAuthenticated) {
      toast.error("Please log in to leave a rating.");
      return;
    }
    if (isRating) return;
    setIsRating(true);
    try {
      const response = await axiosInstance.post(
        `${API_PATHS.PUBLIC.RATE_BOOK}/${bookId}/rate`,
        { rating: value }
      );
      setBook(response.data.data);
      toast.success("Thanks for your rating!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit rating. Try again."
      );
    } finally {
      setIsRating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 px-6 lg:px-8">
        {isLoading ? (
          <div className="animate-pulse max-w-6xl mx-auto">
            <div className="h-8 bg-slate-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-slate-200 rounded-lg"></div>
          </div>
        ) : book ? (
          <div>
            <div className="max-w-6xl mx-auto mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-4 items-start">
                <div className="w-24 h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  {resolveImageUrl(book?.coverImage || book?.coverImageUrl) ? (
                    <img
                      src={resolveImageUrl(
                        book?.coverImage || book?.coverImageUrl
                      )}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-book text-lg">
                      {book?.title?.charAt(0)?.toUpperCase() || "B"}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-book font-semibold text-slate-900">
                    {book.title}
                  </h1>
                  <p className="text-sm text-slate-500">by {book.author}</p>
                  {book.description && (
                    <p className="text-sm text-slate-600 mt-2 max-w-2xl">
                      {book.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleRate(value)}
                      className="p-1"
                      disabled={isRating || !isAuthenticated}
                      aria-label={`Rate ${value} stars`}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          book.ratingAverage >= value
                            ? "fill-amber-400 text-amber-400"
                            : isAuthenticated
                            ? "text-slate-300"
                            : "text-slate-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs text-slate-500">
                  {book.ratingAverage
                    ? `${book.ratingAverage.toFixed(1)} (${book.ratingCount})`
                    : "No ratings yet"}
                </span>
                {!isAuthenticated && (
                  <a href="/login" className="text-xs text-violet-600">
                    Log in to rate
                  </a>
                )}
              </div>
            </div>
            <ViewBook book={book} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center border border-slate-200 rounded-2xl max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Book className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Book not found
            </h3>
            <p className="text-slate-500 max-w-md">
              This book may be unpublished or does not exist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicBookPage;
