import React from "react";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Wand2,
  Layers3,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { isAuthenticated } = useAuth();
  const ctaLink = isAuthenticated ? "/dashboard" : "/login";

  return (
    <section className="min-h-screen pt-24 pb-10 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_10%,rgba(139,92,246,0.25),transparent),radial-gradient(60%_50%_at_80%_20%,rgba(236,72,153,0.18),transparent)]"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/15 rounded-full">
              <Sparkles className="w-4 h-4 text-violet-300" />
              <span className="text-sm text-slate-200 font-medium">
                Build & publish with calm AI
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-book font-semibold text-white leading-tight">
                Create beautiful eBooks
                <span className="block mt-2 bg-linear-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
                  in a focused workspace
                </span>
              </h1>
              <p className="text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl">
                BookForge helps you draft, organize, and publish with clarity.
                Free users can create up to 5 books; Pro unlocks publishing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={ctaLink}
                className="group px-6 py-3.5 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-violet-500/40 transition-all inline-flex items-center justify-center gap-2"
              >
                Start free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#pricing"
                className="px-6 py-3.5 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20 inline-flex items-center justify-center"
              >
                View pricing
              </a>
              <Link
                to="/library"
                className="px-6 py-3.5 bg-white/5 text-white/90 rounded-xl font-semibold hover:bg-white/10 transition-all border border-white/10 inline-flex items-center justify-center"
              >
                Browse library
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-xl font-book text-white">5</div>
                <div className="text-xs text-slate-300">Free books</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-xl font-book text-white">1-click</div>
                <div className="text-xs text-slate-300">Publishing</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-xl font-book text-white">AI</div>
                <div className="text-xs text-slate-300">Drafting</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 blur-2xl"></div>
            <div className="relative rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                    <BookOpen className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      The Calm Writer
                    </div>
                    <div className="text-xs text-slate-400">Draft in progress</div>
                  </div>
                </div>
                <span className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Chapter 4
                </span>
              </div>

              <div className="space-y-2">
                <div className="h-2.5 rounded-full bg-slate-800 w-full"></div>
                <div className="h-2.5 rounded-full bg-slate-800 w-5/6"></div>
                <div className="h-2.5 rounded-full bg-slate-800 w-4/6"></div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-5">
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-2.5 text-center">
                  <Wand2 className="w-4.5 h-4.5 text-violet-300 mx-auto" />
                  <div className="text-[11px] text-slate-400 mt-2">
                    AI Drafts
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-2.5 text-center">
                  <Layers3 className="w-4.5 h-4.5 text-fuchsia-300 mx-auto" />
                  <div className="text-[11px] text-slate-400 mt-2">
                    Structure
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-2.5 text-center">
                  <BookOpen className="w-4.5 h-4.5 text-pink-300 mx-auto" />
                  <div className="text-[11px] text-slate-400 mt-2">
                    Publish
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-3.5">
                <div className="text-xs text-slate-400 mb-2">
                  Suggested outline
                </div>
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-slate-800 w-5/6"></div>
                  <div className="h-2 rounded-full bg-slate-800 w-3/4"></div>
                  <div className="h-2 rounded-full bg-slate-800 w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
