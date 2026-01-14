import React, { useState, useEffect } from "react";
import { Book, Menu, LogOut, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navigate = useNavigate();

  //close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileDropdownOpen]);
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Book className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
              BookForge
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#templates"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
          </div>

          {isAuthenticated ? (
            <div className="hidden md:flex items-center justify-center">
              <ProfileDropdown
                isOpen={profileDropdownOpen}
                onToggle={(e) => {
                  e.stopPropagation();
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
                avatar={user?.avatar || ""}
                companyName={user?.name}
                email={user?.email}
                userRole={user?.role}
                onLogout={logout}
              />
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="cursor-pointer px-4 py-2.5 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl hover:shadow-lg hover:shadow-violet-500/40 transition-all font-medium"
              >
                Login
              </button>
              <button className="px-6 py-2.5 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl hover:shadow-lg hover:shadow-violet-500/40 transition-all font-medium">
                Start Free Trial
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pt-6 pb-4 space-y-4 border-t border-slate-800 mt-4">
            <a
              href="#features"
              className="block text-slate-300 hover:text-white transition-colors py-2"
            >
              Features
            </a>
            <a
              href="#templates"
              className="block text-slate-300 hover:text-white transition-colors py-2"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="block text-slate-300 hover:text-white transition-colors py-2"
            >
              Pricing
            </a>
            <hr className="border-slate-800" />
            {isAuthenticated ? (
              <>
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-white">{user?.name}</div>
                  <div className="text-slate-400">{user?.email}</div>
                </div>
                <div className="flex justify-center">
                  <Link
                    className="px-4 py-2 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl hover:shadow-lg hover:shadow-violet-500/40 transition-all font-medium"
                    to={"/logout"}
                  >
                    Logout
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex justify-center">
                <Link
                  className="px-4 py-2 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl hover:shadow-lg hover:shadow-violet-500/40 transition-all font-medium"
                  to={"/login"}
                >
                  Login
                </Link>
              </div>
            )}
            <button className="w-full px-6 py-3 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-medium">
              Start Free Trial
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
