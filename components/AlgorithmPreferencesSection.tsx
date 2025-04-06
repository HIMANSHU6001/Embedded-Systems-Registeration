import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface AlgorithmPreferencesSectionProps {
  form: UseFormReturn<{
    email: string;
    selectedAlgorithms: string[];
    fullName: string;
    phoneNumber: string;
    countryCode: string;
    affiliation: string;
    userCategory: "professor" | "industrialist" | "enthusiast" | "other";
    solutionCategory:
      | "withOsWithoutHardware"
      | "withoutHardwareWithOs"
      | "withBothOsAndHardware"
      | "customizable";
    osPreference?: "executable" | "autoBooted";
  }>;
}

// Import algorithm data with descriptions and images
import {
  imageProcessingAlgorithms,
  soundProcessingAlgorithms,
} from "./algorithmData";
import Image from "next/image";

const AlgorithmPreferencesSection: React.FC<
  AlgorithmPreferencesSectionProps
> = ({ form }) => {
  const [expandedDetails, setExpandedDetails] = useState<
    Record<string, boolean>
  >({});
  const [activeTab, setActiveTab] = useState<"image" | "sound">("image");

  // Toggle algorithm details visibility
  const toggleDetails = (algorithmId: string) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [algorithmId]: !prev[algorithmId],
    }));
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Select Your Preferred Algorithms{" "}
          <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500">
          Choose at least one algorithm. You can select multiple options.
        </p>
      </div>

      {/* Custom tab implementation */}
      <div className="w-full mb-6">
        <div className="grid grid-cols-2 border border-gray-200 rounded-md overflow-hidden">
          <button
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("image");
            }}
            className={`py-2 text-center text-sm font-medium ${
              activeTab === "image"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-colors`}
          >
            Image Processing
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("sound");
            }}
            className={`py-2 text-center text-sm font-medium ${
              activeTab === "sound"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-colors`}
          >
            Sound Processing
          </button>
        </div>
      </div>

      {/* Image Processing Tab Content */}
      <div className={activeTab === "image" ? "block" : "hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {imageProcessingAlgorithms.map((algorithm) => (
            <div
              key={algorithm.id}
              className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-2">
                <div className="pt-0.5">
                  <input
                    type="checkbox"
                    id={algorithm.id}
                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    checked={
                      form
                        .watch("selectedAlgorithms")
                        ?.includes(algorithm.id) || false
                    }
                    onChange={(e) => {
                      const currentValues =
                        form.watch("selectedAlgorithms") || [];
                      if (e.target.checked) {
                        form.setValue(
                          "selectedAlgorithms",
                          [...currentValues, algorithm.id],
                          { shouldValidate: true }
                        );
                      } else {
                        form.setValue(
                          "selectedAlgorithms",
                          currentValues.filter(
                            (value: string) => value !== algorithm.id
                          ),
                          { shouldValidate: true }
                        );
                      }
                    }}
                  />
                </div>
                <div className="grid gap-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={algorithm.id}
                      className="font-medium text-sm cursor-pointer"
                    >
                      {algorithm.label}
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleDetails(algorithm.id)}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    >
                      {expandedDetails[algorithm.id]
                        ? "Hide Details"
                        : "More Details"}
                    </button>
                  </div>

                  {/* Always show the algorithm image */}
                  <div className="mt-2">
                    <Image
                      src={algorithm.image}
                      alt={algorithm.label}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>

                  {expandedDetails[algorithm.id] && (
                    <div className="mt-2 text-sm text-gray-600">
                      {algorithm.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sound Processing Tab Content */}
      <div className={activeTab === "sound" ? "block" : "hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {soundProcessingAlgorithms.map((algorithm) => (
            <div
              key={algorithm.id}
              className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-2">
                <div className="pt-0.5">
                  <input
                    type="checkbox"
                    id={algorithm.id}
                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    checked={
                      form
                        .watch("selectedAlgorithms")
                        ?.includes(algorithm.id) || false
                    }
                    onChange={(e) => {
                      const currentValues =
                        form.watch("selectedAlgorithms") || [];
                      if (e.target.checked) {
                        form.setValue(
                          "selectedAlgorithms",
                          [...currentValues, algorithm.id],
                          { shouldValidate: true }
                        );
                      } else {
                        form.setValue(
                          "selectedAlgorithms",
                          currentValues.filter(
                            (value: string) => value !== algorithm.id
                          ),
                          { shouldValidate: true }
                        );
                      }
                    }}
                  />
                </div>
                <div className="grid gap-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={algorithm.id}
                      className="font-medium text-sm cursor-pointer"
                    >
                      {algorithm.label}
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleDetails(algorithm.id)}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    >
                      {expandedDetails[algorithm.id]
                        ? "Hide Details"
                        : "More Details"}
                    </button>
                  </div>

                  {/* Always show the algorithm image */}
                  <div className="mt-2">
                    <Image
                      src={algorithm.image}
                      alt={algorithm.label}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>

                  {expandedDetails[algorithm.id] && (
                    <div className="mt-2 text-sm text-gray-600">
                      {algorithm.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {form.formState.errors.selectedAlgorithms && (
        <p className="text-sm text-red-500 mt-2">
          {form.formState.errors.selectedAlgorithms.message as string}
        </p>
      )}
    </div>
  );
};

export default AlgorithmPreferencesSection;
