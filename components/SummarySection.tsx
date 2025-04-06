import React from "react";
import { UseFormReturn } from "react-hook-form";

// Import algorithm data to display proper labels
import {
  imageProcessingAlgorithms,
  soundProcessingAlgorithms,
} from "./algorithmData";
import { FormValues } from "./RegistrationForm";

interface SummarySectionProps {
  form: UseFormReturn<FormValues>;
  showOsPreferences: boolean;
}

// Helper function to get algorithm labels
const getAlgorithmLabels = (selectedIds: string[]) => {
  const allAlgorithms = [
    ...imageProcessingAlgorithms,
    ...soundProcessingAlgorithms,
  ];
  return selectedIds.map((id) => {
    const algorithm = allAlgorithms.find((algo) => algo.id === id);
    return algorithm ? algorithm.label : id;
  });
};

// Map solution category to display names
const solutionCategoryLabels: Record<string, string> = {
  withOsWithoutHardware: "With OS, Without Hardware",
  withoutHardwareWithOs: "Without Hardware, With OS",
  withBothOsAndHardware: "With Both OS and Hardware",
  customizable: "Customizable Solution",
};

// Map OS preference to display names
const osPreferenceLabels: Record<string, string> = {
  executable: "Executable File",
  autoBooted: "Auto Booted (Plug and Play)",
};

// Map user category to display names
const userCategoryLabels: Record<string, string> = {
  professor: "Professor",
  industrialist: "Industrialist",
  enthusiast: "Tech Enthusiast",
  other: "Other",
};

const SummarySection: React.FC<SummarySectionProps> = ({
  form,
  showOsPreferences,
}) => {
  const formValues = form.getValues();
  const algorithmLabels = getAlgorithmLabels(
    formValues.selectedAlgorithms || []
  );

  return (
    <div className="space-y-6">
      <p className="text-center text-gray-500 mb-6">
        Please review your registration details below before submitting.
      </p>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{formValues.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{formValues.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">
                {formValues.countryCode} {formValues.phoneNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Affiliation</p>
              <p className="font-medium">{formValues.affiliation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">User Category</p>
              <p className="font-medium">
                {userCategoryLabels[formValues.userCategory] ||
                  formValues.userCategory}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Solution Preferences</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Solution Category</p>
              <p className="font-medium">
                {solutionCategoryLabels[formValues.solutionCategory] ||
                  formValues.solutionCategory}
              </p>
            </div>

            {showOsPreferences && (
              <div>
                <p className="text-sm text-gray-500">OS Preference</p>
                <p className="font-medium">
                  {osPreferenceLabels[formValues.osPreference || ""] ||
                    "Not specified"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Selected Algorithms</h3>
          {algorithmLabels.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {algorithmLabels.map((label, index) => (
                <li key={index} className="font-medium">
                  {label}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No algorithms selected</p>
          )}
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold mb-2 text-green-700">
          Thank You For Registering!
        </h3>
        <p className="text-green-600 mb-4">
          If you want to be a part of our community, if you want any of our
          device or want to customize it as per your need - then do contact us.
        </p>
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold mb-2 text-blue-700">
          Have a custom project idea?
        </h3>
        <p className="text-blue-600 mb-4">
          If you have any problem statement or any creative idea that can bring
          one or more algorithms together to solve a real-world or social
          problem, reach us on WhatsApp.
        </p>
        <p className="text-blue-600 mb-2">
          We would love to discuss and if needed, we will also share some
          reference or research work.
        </p>
        <p className="font-bold text-blue-700">Contact us: +91 90401 31134</p>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        © Kalpruti Medtech pvt ltd. All rights reserved.
      </div>
    </div>
  );
};

export default SummarySection;
