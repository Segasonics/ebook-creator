import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";
import { useAuth } from "../context/AuthContext";

const BillingPage = () => {
  const { user } = useAuth();
  const [booksCount, setBooksCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [credits, setCredits] = useState(null);
  const [creditsResetAt, setCreditsResetAt] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [booksRes, profileRes] = await Promise.all([
          axiosInstance.get(API_PATHS.BOOKS.GET_BOOKS),
          axiosInstance.get(API_PATHS.AUTH.PROFILE),
        ]);
        const books = booksRes.data.data || [];
        setBooksCount(books.length);
        const profile = profileRes.data.data;
        setCredits(profile?.credits ?? null);
        setCreditsResetAt(profile?.creditsResetAt ?? null);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const isPro = !!user?.isPro;
  const limit = 5;
  const remaining =
    isPro || credits === null ? limit : Math.max(0, credits);
  const used = isPro ? booksCount : Math.max(0, limit - remaining);
  const usagePercent = isPro
    ? 100
    : Math.min(100, (used / limit) * 100);
  const resetLabel = creditsResetAt
    ? new Date(creditsResetAt).toLocaleDateString()
    : "Monthly";

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">
            Billing & Usage
          </p>
          <h1 className="text-3xl font-book font-semibold text-slate-900 mt-2">
            Your plan
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Track your usage and upgrade when you are ready to publish.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-600">Plan</p>
                <h2 className="text-2xl font-book font-semibold text-slate-900">
                  {isPro ? "Pro" : "Free"}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Price</p>
                <p className="text-lg font-semibold text-slate-900">
                  {isPro ? "$9/mo" : "$0"}
                </p>
              </div>
            </div>
            {!isPro && (
              <a
                href="/#pricing"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
              >
                Upgrade to Pro
              </a>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-600 mb-4">Usage</p>
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-3 bg-slate-200 rounded mb-3"></div>
                <div className="h-6 bg-slate-200 rounded w-2/3"></div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Books created</span>
                  <span>
                    {isPro ? `${used} / Unlimited` : `${used} / ${limit}`}
                  </span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500"
                    style={{ width: `${usagePercent}%` }}
                  />
                </div>
                {!isPro && credits !== null && (
                  <p className="text-xs text-slate-500 mt-3">
                    {remaining} credits left. Resets on {resetLabel}.
                  </p>
                )}
                {isPro && (
                  <p className="text-xs text-slate-500 mt-3">
                    Unlimited books with Pro.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BillingPage;
