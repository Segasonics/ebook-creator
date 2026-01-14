import React, { useState, useEffect } from "react";
import { Album } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const [profileDropdown, setProfileDropdown] = useState(false);

  //close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropdown) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileDropdown]);
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex flex-col flex-1 w-full">
        <header className="bg-white/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between h-16 border-gray-200">
          <div className="flex items-center space-x-4">
            <Link className="flex items-center space-x-3" to="/dashboard">
              <div className="h-8 w-8 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                <Album className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <Link className="text-black font-bold text-xl" to={"/"}>
                BookForge
              </Link>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <ProfileDropdown
              onToggle={(e) => {
                e.stopPropagation();
                setProfileDropdown(!profileDropdown);
              }}
              avatar={user?.avatar}
              companyName={user?.companyName}
              email={user?.email}
              onLogout={logout}
              isOpen={profileDropdown}
            />
          </div>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
