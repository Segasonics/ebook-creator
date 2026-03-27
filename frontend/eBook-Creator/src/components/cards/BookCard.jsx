import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resolveImageUrl } from "../../utils/imageUrl";
import { Edit, Trash } from "lucide-react";

const BookCard = ({ book, onDelete }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const coverImageUrl = resolveImageUrl(
    book?.coverImage || book?.coverImageUrl
  );

  useEffect(() => {
    setImageError(false);
  }, [coverImageUrl]);

  const showPlaceholder = !coverImageUrl || imageError;

  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate(`/view-book/${book._id}`)}
    >
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
        <div className="relative w-full h-52 sm:h-56 bg-slate-50 overflow-hidden rounded-t-2xl">
          {showPlaceholder ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[radial-gradient(120%_120%_at_100%_0%,#E0F2FE_0%,#ECFDF3_45%,#FFFFFF_70%)] text-slate-500">
              <div className="w-10 h-10 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center text-slate-500 text-base font-semibold font-book">
                {book?.title?.charAt(0)?.toUpperCase() || "B"}
              </div>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em]">
                No Cover
              </p>
            </div>
          ) : (
            <img
              src={coverImageUrl}
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-slate-900/10 to-transparent" />
        </div>

        <div className="px-3 py-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-book text-sm text-slate-900 leading-tight line-clamp-2">
                {book.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                {book.author}
              </p>
            </div>
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/editor/${book._id}`);
                }}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white transition-colors flex items-center justify-center"
                aria-label="Edit book"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(book._id);
                }}
                className="w-7 h-7 rounded-full bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition-colors flex items-center justify-center"
                aria-label="Delete book"
              >
                <Trash className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-400">
            <span>{book?.status || "draft"}</span>
            <span>{book?.chapters?.length || 0} ch</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
