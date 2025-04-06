"use client";
import React from "react";
import RegistrationForm from "@/components/RegistrationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary">
            Embedded Systems Solutions
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Register your preferences for embedded system solutions tailored for
            professors, industrialists, tech enthusiasts, and others
          </p>
        </header>

        <RegistrationForm />

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© 2025 Embedded Systems Solutions. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
