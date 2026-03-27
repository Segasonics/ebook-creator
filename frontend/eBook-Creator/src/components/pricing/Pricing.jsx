import React from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Pricing = () => {
  const { isAuthenticated } = useAuth();
  const ctaLink = isAuthenticated ? "/dashboard" : "/login";

  return (
    <section id="pricing" className="py-20 px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">
            Pricing
          </p>
          <h2 className="text-4xl lg:text-5xl font-book font-semibold text-slate-900 mt-2">
            Simple, transparent plans
          </h2>
          <p className="text-lg text-slate-500 mt-3 max-w-2xl mx-auto">
            Start free, upgrade when you are ready to publish.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Free */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm font-semibold text-slate-600">Free</p>
                <h3 className="text-3xl font-book font-semibold text-slate-900">
                  $0
                </h3>
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Starter
              </span>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                Create up to 5 books
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                AI outline + chapter drafting
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                Export to PDF / DOC
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Check className="w-4 h-4 text-slate-300" />
                Publish to public library
              </li>
            </ul>
            <Link
              to={ctaLink}
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Start for free
            </Link>
          </div>

          {/* Pro */}
          <div className="relative rounded-2xl border border-violet-200 bg-white p-8 shadow-[0_20px_40px_-24px_rgba(79,70,229,0.6)]">
            <div className="absolute -top-3 right-6 rounded-full bg-linear-to-r from-violet-600 to-fuchsia-600 px-3 py-1 text-xs font-semibold text-white">
              Most popular
            </div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm font-semibold text-slate-600">Pro</p>
                <div className="flex items-end gap-2">
                  <h3 className="text-3xl font-book font-semibold text-slate-900">
                    $9
                  </h3>
                  <span className="text-sm text-slate-500">/mo</span>
                </div>
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-violet-500">
                Publish
              </span>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                Unlimited books
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                Publish your books
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                Priority exports + templates
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                Premium AI enhancements
              </li>
            </ul>
            <Link
              to={ctaLink}
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
