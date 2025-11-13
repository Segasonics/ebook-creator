import { Book } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="py-12 px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">BookForge</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Empowering authors to create and publish beautiful e-books.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="block text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Templates
                </a>
                <a
                  href="#"
                  className="block text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="block text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Updates
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-slate-400 hover:text-white text-sm transition-colors"
                >
                  About
                </a>
                <a
                  href="#"
                  className="block text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Blog
                </a>
                <a
                  href="#"
                  className="block text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Careers
                </a>
                <a
                  href="#"
                  className="block text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="block text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="block text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Security
                </a>
                <a
                  href="#"
                  className="block text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Cookies
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            © 2025 BookForge. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
