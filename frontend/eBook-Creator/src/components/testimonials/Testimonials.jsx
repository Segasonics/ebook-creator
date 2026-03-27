import React from "react";
import { Star } from "lucide-react";

const Testimonials = () => {
  const items = [
    {
      name: "Nina Patel",
      role: "Indie Author",
      quote:
        "I went from idea to a polished manuscript in a weekend. The AI assistant feels like a calm co‑author.",
    },
    {
      name: "Marcus Lee",
      role: "Content Strategist",
      quote:
        "The structure tools are incredible. Outlines, chapters, and exports are all in one place.",
    },
    {
      name: "Elena Ruiz",
      role: "Educator",
      quote:
        "Publishing is a single click. My students can read the book instantly in a clean reader.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">
            Testimonials
          </p>
          <h2 className="text-4xl lg:text-5xl font-book font-semibold text-slate-900 mt-2">
            Loved by modern authors
          </h2>
          <p className="text-lg text-slate-500 mt-3 max-w-2xl mx-auto">
            Focused, calm, and professional — everything you need to ship a book
            you are proud of.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-6 shadow-sm"
            >
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="font-ink text-slate-700 leading-relaxed">
                “{item.quote}”
              </p>
              <div className="mt-5">
                <div className="text-sm font-semibold text-slate-900">
                  {item.name}
                </div>
                <div className="text-xs text-slate-500">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
