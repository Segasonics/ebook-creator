import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/apiPath";
import { Edit, Trash } from "lucide-react";

const BookCard = ({ book, onDelete }) => {
  const navigate = useNavigate();

  const coverImageUrl = book.coverImage
    ? `${BASE_URL}/backend${book.coverImage}`.replace(/\\/g, "/")
    : "";

  return (
    <div
      className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 transition-all hover:shadow-md cursor-pointer w-full max-w-[250px]"
      onClick={() => navigate(`/view-book/${book._id}`)}
    >
      {/* Smaller image ratio */}
      <div className="relative w-full aspect-8/9 bg-gray-100 overflow-hidden">
        <img
          src={coverImageUrl}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "";
          }}
        />

        {/* Hover icons (always visible on hover) */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/editor/${book._id}`);
            }}
            className="w-7 h-7 bg-gray-600 border border-gray-300 rounded-full flex items-center justify-center shadow-sm hover:bg-violet-500 transition-colors"
          >
            <Edit className="w-3.5 h-3.5 text-gray-700 group-hover:text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(book._id);
            }}
            className="w-7 h-7 bg-gray-600 border border-gray-300 rounded-full flex items-center justify-center shadow-sm hover:bg-red-500 transition-colors"
          >
            <Trash className="w-3.5 h-3.5 text-red-500 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Compact info */}
      <div className="absolute bottom-0 left-0 p-8 right-0 text-white">
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent backdrop-blur-xs">
          <div className="relative px-4 py-2">
            <h3 className="font-semibold text-white leading-tight text-sm line-clamp-2 mb-1">
              {book.title}
            </h3>
            <p className="text-[13px] text-gray-300 font-medium">
              {book.author}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-linear-to-r from-violet-400 via-fuchsia-400 to-pink-400 transition-opacity duration-300" />
    </div>
  );
};

export default BookCard;
