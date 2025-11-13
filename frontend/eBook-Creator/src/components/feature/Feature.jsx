import React from "react";
import { Zap, Globe, Download, Book, Users, Lock } from "lucide-react";
const Feature = () => {
  return (
    <>
      <section id="features" className="py-8 px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-400">
              Powerful tools to bring your stories to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Feature 1 */}
            <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10">
              <div className="w-14 h-14 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                AI Writing Assistant
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Get intelligent suggestions and overcome writer's block with our
                AI-powered writing companion.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10">
              <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Book className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Premium Templates
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Choose from stunning templates designed by professionals for
                every genre and style.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10">
              <div className="w-14 h-14 bg-linear-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Global Publishing
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Publish to major platforms worldwide with one click. Amazon,
                Apple Books, and more.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10">
              <div className="w-14 h-14 bg-linear-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Download className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Export Anywhere
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Export your e-books in multiple formats: EPUB, PDF, MOBI, and
                more.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10">
              <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Collaboration
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Work together with co-authors, editors, and beta readers in
                real-time.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10">
              <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                DRM Protection
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Protect your intellectual property with advanced digital rights
                management.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Feature;
