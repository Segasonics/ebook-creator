import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/footer/Footer";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";
import PublicBookCard from "../components/public/PublicBookCard";
import { BookOpen } from "lucide-react";

const PublicLibraryPage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.max(1, Math.ceil(books.length / pageSize));
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, books.length);
  const pagedBooks = books.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(API_PATHS.PUBLIC.BOOKS);
        setBooks(response.data.data || []);
      } catch (error) {
        console.error("Error fetching published books:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="pt-28 pb-16 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">
              Public Library
            </p>
            <h1 className="text-4xl lg:text-5xl font-book font-semibold text-slate-900 mt-2">
              Published eBooks
            </h1>
            <p className="text-lg text-slate-500 mt-3">
              Explore books published by the community.
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-2xl border border-slate-200/70 bg-white overflow-hidden"
                >
                  <div className="flex gap-4 p-4">
                    <div className="w-24 h-32 bg-slate-200 rounded-xl"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                      <div className="h-3 w-1/3 bg-slate-200 rounded"></div>
                      <div className="h-3 w-5/6 bg-slate-200 rounded"></div>
                      <div className="h-3 w-2/3 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="flex flex-col items-center gap-4 justify-center py-16 text-center border border-slate-200/70 rounded-3xl bg-slate-50">
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full border border-slate-200">
                <BookOpen className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                No published books yet
              </h3>
              <p className="text-sm text-slate-600 max-w-md">
                Be the first to publish your book and inspire new readers.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {pagedBooks.map((book) => (
                  <PublicBookCard key={book._id} book={book} />
                ))}
              </div>

              {books.length > pageSize && (
                <div className="mt-8 flex flex-col gap-3 items-center justify-between rounded-2xl border border-slate-200/70 bg-white px-4 py-3 sm:flex-row">
                  <p className="text-sm text-slate-500">
                    Showing <span className="font-semibold text-slate-700">{startIndex + 1}</span>
                    {" "}to{" "}
                    <span className="font-semibold text-slate-700">{endIndex}</span>
                    {" "}of{" "}
                    <span className="font-semibold text-slate-700">{books.length}</span>
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                      disabled={page === 1}
                      className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <div className="text-sm text-slate-500">
                      Page <span className="font-semibold text-slate-700">{page}</span> of{" "}
                      <span className="font-semibold text-slate-700">{totalPages}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={page === totalPages}
                      className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PublicLibraryPage;
