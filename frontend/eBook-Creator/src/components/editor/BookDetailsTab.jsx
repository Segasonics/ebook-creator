import React, { useEffect, useState } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { UploadCloud } from "lucide-react";
import { resolveImageUrl } from "../../utils/imageUrl";

const BookDetailsTab = ({
  book,
  onBookChange,
  onCoverUpload,
  onGenerateDescription,
  isUploading,
  isGeneratingDescription,
  fileInputRef,
}) => {
  const [imageError, setImageError] = useState(false);
  const coverImageUrl = resolveImageUrl(
    book?.coverImage || book?.coverImageUrl
  );

  useEffect(() => {
    setImageError(false);
  }, [coverImageUrl]);

  const showPlaceholder = !coverImageUrl || imageError;
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-slate-900">
          Book Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Title"
            name="title"
            value={book.title}
            onChange={onBookChange}
          />
          <InputField
            label="Author"
            name="title"
            value={book.author}
            onChange={onBookChange}
          />
          <div className="md:col-span-2">
            <InputField
              label={"subtitle"}
              name="subtitle"
              value={book.subtitle || ""}
              onChange={onBookChange}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <div className="flex flex-col gap-3">
              <textarea
                name="description"
                value={book.description || ""}
                onChange={onBookChange}
                rows={3}
                placeholder="Short description for the public library"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-400/30 focus:border-violet-400"
              />
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  name="descriptionLocked"
                  checked={!!book.descriptionLocked}
                  onChange={onBookChange}
                  className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-400/30"
                />
                Lock description to prevent AI overwrite
              </label>
              <div className="flex justify-end">
                <Button
                  variant="secondary"
                  onClick={onGenerateDescription}
                  isLoading={isGeneratingDescription}
                  className={
                    book.descriptionLocked ? "opacity-60 cursor-not-allowed" : ""
                  }
                  aria-disabled={book.descriptionLocked}
                >
                  Generate with AI
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6 mt-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Cover Image
        </h3>
        <div className="flex items-start gap-6">
          {showPlaceholder ? (
            <div className="w-32 h-48 rounded-lg bg-linear-to-br from-slate-100 to-slate-200 shadow flex flex-col items-center justify-center text-slate-500">
              <div className="w-10 h-10 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center text-slate-400 text-base font-semibold">
                {book?.title?.charAt(0)?.toUpperCase() || "B"}
              </div>
              <p className="mt-2 text-[11px] font-medium uppercase tracking-wide">
                No Cover
              </p>
            </div>
          ) : (
            <img
              src={coverImageUrl}
              alt="cover"
              className="w-32 h-48 object-cover rounded-lg bg-slate-100 shadow"
              onError={() => setImageError(true)}
            />
          )}
          <div>
            <p className="text-sm text-slate-600 mb-4">
              Upload a new cover image. Recommended size :600x800px.
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onCoverUpload}
              className="hidden"
              accept="image/*"
            />
            <Button
              variant="secondary"
              onClick={() => fileInputRef.current.click()}
              isLoading={isUploading}
              icon={UploadCloud}
            >
              Upload Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsTab;
