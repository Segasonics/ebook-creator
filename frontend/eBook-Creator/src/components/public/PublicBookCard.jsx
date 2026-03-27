import React from "react";
import { useNavigate } from "react-router-dom";
import { resolveImageUrl } from "../../utils/imageUrl";
import { Star } from "lucide-react";

const PublicBookCard = ({ book }) => {
  const navigate = useNavigate();
  const coverImageUrl = resolveImageUrl(book?.coverImage || book?.coverImageUrl);
  const description =
    book?.description || book?.subtitle || "No description available yet.";
  const rating = book?.ratingAverage ?? null;

  return (
    <button
      onClick={() => navigate(`/library/${book._id}`)}
      className="text-left group rounded-2xl border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden w-full"
    >
      <div className="flex gap-4 p-4">
        <div className="relative w-24 h-32 bg-slate-50 rounded-xl overflow-hidden shrink-0">
          {coverImageUrl ? (
            <img
              src={coverImageUrl}
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(120%_120%_at_100%_0%,#E0F2FE_0%,#ECFDF3_45%,#FFFFFF_70%)] text-slate-500">
              <div className="w-10 h-10 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center text-slate-500 text-base font-semibold font-book">
                {book?.title?.charAt(0)?.toUpperCase() || "B"}
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-book text-base text-slate-900 leading-tight line-clamp-2">
                {book.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                {book.author}
              </p>
            </div>
            <div className="text-xs text-slate-400">
              {book?.chapters?.length || 0} ch
            </div>
          </div>

          <p className="text-sm text-slate-600 mt-3 line-clamp-2">
            {description}
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                  }`}
                />
              ))}
            </div>
            <span>{rating ? rating.toFixed(1) : "No ratings yet"}</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default PublicBookCard;
