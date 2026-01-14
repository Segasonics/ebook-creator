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
}) => {
  const navigate = useNavigate();
  console.log(companyName);
  return (
    <div className="relative">
      <button onClick={onToggle} className="flex items-center rounded-xl">
        {avatar ? (
          <img
            src={avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full">
            {companyName?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="ml-2">
          <p className="text-sm font-semibold text-white">
            {companyName?.toUpperCase()}
          </p>
          <p className="text-xs text-gray-600">{email}</p>
        </div>
        {onLogout && (
          <ChevronDown
            className="w-5 h-5 ml-2 text-white"
            strokeWidth={2.5}
            onClick={onLogout}
          />
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg">
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
