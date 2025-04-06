"use client";
import React from "react";
import RegistrationForm from "@/components/RegistrationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-6 md:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Embedded Systems Solutions
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            Register your preferences for embedded system solutions tailored for
            professors, industrialists, tech enthusiasts, and others
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          <RegistrationForm />
        </div>

        <footer className="mt-8 md:mt-16 text-center text-xs sm:text-sm text-gray-500">
          <p>© 2025 Kalpruh Pvt. Ltv. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
