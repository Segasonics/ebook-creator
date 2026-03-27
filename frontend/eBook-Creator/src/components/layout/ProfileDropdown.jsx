import React from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({
  onToggle,
  avatar,
  companyName,
  email,
  onLogout,
  isOpen,
  theme = "dark",
}) => {
  const navigate = useNavigate();
  const displayName = companyName || email?.split("@")[0] || "User";
  const initial = displayName?.trim()?.charAt(0)?.toUpperCase() || "U";
  const isLight = theme === "light";
  const nameClass = isLight ? "text-slate-900" : "text-white";
  const emailClass = isLight ? "text-slate-500" : "text-slate-300";
  const chevronClass = isLight ? "text-slate-500" : "text-white";
  const avatarFallbackClass = isLight
    ? "bg-slate-200 text-slate-700"
    : "bg-white/20 text-white";
  const hoverClass = isLight
    ? "hover:border-slate-200/80 hover:bg-white/70"
    : "hover:border-transparent hover:bg-transparent";
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-3 rounded-2xl border border-transparent px-2 py-1 transition-colors ${hoverClass}`}
      >
        {avatar ? (
          <img
            src={avatar}
            alt="User Avatar"
            className="w-9 h-9 rounded-full object-cover border border-slate-200"
          />
        ) : (
          <div
            className={`w-9 h-9 flex items-center justify-center rounded-full ${avatarFallbackClass} font-book text-sm`}
          >
            {initial}
          </div>
        )}
        <div className="min-w-0 text-left">
          <p
            className={`text-sm font-semibold ${nameClass} truncate max-w-[160px]`}
          >
            {displayName}
          </p>
          <p
            className={`text-xs ${emailClass} truncate max-w-[180px] hidden sm:block`}
          >
            {email}
          </p>
        </div>
        {onLogout && (
          <ChevronDown
            className={`w-5 h-5 ml-2 ${chevronClass}`}
            strokeWidth={2.5}
            aria-hidden="true"
          />
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-50">
          <div className="px-4 py-2">
            <p className="text-sm font-semibold">{companyName}</p>
            <p className="text-xs text-gray-600">{email}</p>
          </div>
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            View Profile
          </button>
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
            onClick={() => navigate("/billing")}
          >
            Billing & Usage
          </button>
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
            onClick={() => navigate("/library")}
          >
            Public Library
          </button>
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
