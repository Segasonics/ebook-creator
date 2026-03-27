import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CallToAction = () => {
  const { isAuthenticated } = useAuth();
  const ctaLink = isAuthenticated ? "/dashboard" : "/login";
  return (
    <>
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl p-10 lg:p-14 overflow-hidden bg-gradient-to-br from-violet-700 via-fuchsia-600 to-pink-600 shadow-[0_30px_80px_-40px_rgba(124,58,237,0.8)]">
            {/* Ambient highlights */}
            <div className="pointer-events-none absolute -top-16 -left-12 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-15">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "40px 40px",
                }}
              ></div>
            </div>

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm text-white/90">
                  <span className="h-2 w-2 rounded-full bg-white/80"></span>
                  Calm, focused writing
                </div>
                <h2 className="text-4xl lg:text-5xl font-book font-semibold text-white">
                  Start writing today
                </h2>
                <p className="text-lg text-white/90 max-w-xl">
                  Bring your ideas to life with a workspace designed for
                  clarity. Draft faster, organize cleanly, and publish when
                  ready.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link
                    to={ctaLink}
                    className="px-8 py-4 bg-white text-violet-700 rounded-xl font-semibold hover:shadow-2xl hover:shadow-white/30 transition-all inline-flex items-center justify-center gap-2"
                  >
                    Start Free
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a
                    href="#pricing"
                    className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
                  >
                    View Pricing
                  </a>
                </div>
                <p className="text-white/80 text-sm">
                  No credit card required - Cancel anytime
                </p>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur p-6">
                <div className="text-sm uppercase tracking-[0.25em] text-white/70">
                  What you get
                </div>
                <div className="mt-4 space-y-3 text-sm text-white/90">
                  <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                    <span>Free plan credits</span>
                    <span className="font-semibold">5 books</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                    <span>AI drafting tools</span>
                    <span className="font-semibold">Included</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                    <span>Publish to library</span>
                    <span className="font-semibold">Pro</span>
                  </div>
                </div>
                <div className="mt-5 text-xs text-white/70">
                  Upgrade anytime to unlock publishing.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
