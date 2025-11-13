import { ArrowRight } from "lucide-react";
import React from "react";

const CallToAction = () => {
  return (
    <>
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-linear-to-r from-violet-600 to-fuchsia-600 rounded-3xl p-12 lg:p-16 overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "40px 40px",
                }}
              ></div>
            </div>

            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Start Writing Today
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join over 50,000 authors who trust BookForge to create and
                publish their stories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button className="px-10 py-4 bg-white text-violet-600 rounded-xl font-bold hover:shadow-2xl hover:shadow-white/30 transition-all inline-flex items-center justify-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-10 py-4 bg-white/10 backdrop-blur text-white rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20">
                  View Pricing
                </button>
              </div>
              <p className="text-white/80 text-sm">
                No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
