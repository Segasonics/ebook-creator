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
      className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10 cursor-pointer"
      onClick={() => navigate(`/view-book/${book._id}`)}
    >
      <div className="relative overflow-hidden bg-linear-to-br from-violet-500 to-fuchsia-500">
        <img
          src={coverImageUrl}
          alt={book.title}
          className="w-full aspect-16/25 object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "";
          }}
        />

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/editor/${book._id}`);
            }}
            className="w-8 h-8 bg-white border border-gray-500 rounded-full flex items-center justify-center shadow-lg hover:bg-violet-500 transition-colors cursor-pointer"
          >
            <Edit className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(book._id);
              className =
                "w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer";
            }}
          >
            <Trash className="w-4 h-4 text-red-500 group-hover/delete:text-red-600" />
          </button>
        </div>
      </div>

      <div className="absolue bottom-0 left-0 right-0 p-4 text-white">
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 backdrop-blur-xs"></div>
        <div className="relative">
          <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-13px text-gray-300 font-medium">{book.author}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-3px bg-linear-to-r from-orange-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default BookCard;
