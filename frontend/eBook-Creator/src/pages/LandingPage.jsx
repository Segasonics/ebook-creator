import React from "react";
import HeroSection from "../components/heroSection/HeroSection";
import Feature from "../components/feature/Feature";
import CallToAction from "../components/cta/CallToAction";
import Footer from "../components/footer/Footer";
import Navbar from "../components/layout/Navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <HeroSection />
      <Feature />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;
