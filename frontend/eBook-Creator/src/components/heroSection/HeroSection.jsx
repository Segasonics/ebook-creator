import React from "react";
import { Sparkles, ArrowRight, Star, Book, Zap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <section className="pt-32 pb-22 px-6 lg:px-8 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm text-violet-300 font-medium">
                  AI-Powered Creation
                </span>
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl xl:text-6xl font-bold text-white leading-tight">
                  Write & Publish
                  <span className="block mt-2 bg-linear-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    Beautiful E-Books
                  </span>
                </h1>

                <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                  Create professional e-books in minutes with AI-powered tools.
                  No design skills needed.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={isAuthenticated ? "/dashboard" : "/login"}
                  className="group px-8 py-4 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-violet-500/50 transition-all flex items-center justify-center gap-2"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-8 py-4 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all border border-slate-700">
                  View Demo
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-white">50,000+</div>
                  <div className="text-slate-400 text-sm">Books Published</div>
                </div>
                <div className="border-l border-slate-800 pl-8">
                  <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold text-white">4.9</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-slate-400 text-sm">User Rating</div>
                </div>
              </div>
            </div>

            {/* Right Content - Book Display */}
            <div className="relative">
              <div className="relative">
                {/* Main Book Card */}
                <div className="relative z-20 bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-700">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                        <Book className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">
                          My First E-Book
                        </div>
                        <div className="text-sm text-slate-400">
                          In Progress
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="h-3 bg-slate-700 rounded-full w-full"></div>
                      <div className="h-3 bg-slate-700 rounded-full w-5/6"></div>
                      <div className="h-3 bg-slate-700 rounded-full w-4/6"></div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-4">
                      <div className="bg-slate-800 rounded-lg p-3 text-center border border-slate-700">
                        <div className="text-2xl font-bold text-white">12</div>
                        <div className="text-xs text-slate-400">Chapters</div>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-3 text-center border border-slate-700">
                        <div className="text-2xl font-bold text-white">45</div>
                        <div className="text-xs text-slate-400">Pages</div>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-3 text-center border border-slate-700">
                        <div className="text-2xl font-bold text-violet-400">
                          78%
                        </div>
                        <div className="text-xs text-slate-400">Done</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-linear-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl backdrop-blur-xl border border-violet-500/20 flex items-center justify-center z-10">
                  <Sparkles className="w-12 h-12 text-violet-400" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-linear-to-br from-fuchsia-500/20 to-pink-500/20 rounded-2xl backdrop-blur-xl border border-fuchsia-500/20 flex items-center justify-center z-10">
                  <Zap className="w-12 h-12 text-fuchsia-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
