import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import Image from "next/image";
import { imageProcessingAlgorithms, soundProcessingAlgorithms } from "./algorithmData";

interface AlgorithmPreferencesSectionProps {
  form: UseFormReturn<{
    email: string;
    selectedAlgorithms: string[];
    fullName: string;
    phoneNumber: string;
    countryCode: string;
    affiliation: string;
    userCategory: "professor" | "industrialist" | "enthusiast" | "other";
    solutionCategory: "withOsWithoutHardware" | "withoutHardwareWithOs" | "withBothOsAndHardware" | "customizable";
    osPreference?: "executable" | "autoBooted";
  }>;
}

const AlgorithmPreferencesSection: React.FC<AlgorithmPreferencesSectionProps> = ({ form }) => {
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<"image" | "sound">("image");

  const toggleDetails = (algorithmId: string) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [algorithmId]: !prev[algorithmId],
    }));
  };

  return (
    <div className="space-y-4 w-full">
      <div className="mb-4">
        <label className="block text-sm sm:text-base font-medium text-gray-900 mb-1">
          Select Your Preferred Algorithms <span className="text-red-500">*</span>
        </label>
        <p className="text-xs sm:text-sm text-gray-600">
          Choose at least one algorithm. You can select multiple options.
        </p>
      </div>

      {/* Tabs */}
      <div className="w-full mb-4">
        <div className="grid grid-cols-2 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("image");
            }}
            className={`py-2 px-1 text-center text-xs sm:text-sm font-medium transition-colors ${
              activeTab === "image"
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Image Processing
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("sound");
            }}
            className={`py-2 px-1 text-center text-xs sm:text-sm font-medium transition-colors ${
              activeTab === "sound"
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Sound Processing
          </button>
        </div>
      </div>

      {/* Image Processing Tab Content */}
      <div className={activeTab === "image" ? "block" : "hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {imageProcessingAlgorithms.map((algorithm) => (
            <div
              key={algorithm.id}
              className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-3">
                  <div className="flex items-start mt-0.5">
                    <input
                      type="checkbox"
                      id={algorithm.id}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={form.watch("selectedAlgorithms")?.includes(algorithm.id) || false}
                      onChange={(e) => {
                        const currentValues = form.watch("selectedAlgorithms") || [];
                        if (e.target.checked) {
                          form.setValue("selectedAlgorithms", [...currentValues, algorithm.id], { shouldValidate: true });
                        } else {
                          form.setValue(
                            "selectedAlgorithms",
                            currentValues.filter((value: string) => value !== algorithm.id),
                            { shouldValidate: true }
                          );
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <label
                        htmlFor={algorithm.id}
                        className="font-medium text-sm sm:text-base text-gray-900 cursor-pointer line-clamp-2"
                      >
                        {algorithm.label}
                      </label>
                      <button
                        type="button"
                        onClick={() => toggleDetails(algorithm.id)}
                        className="shrink-0 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        {expandedDetails[algorithm.id] ? "Hide" : "Details"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="relative w-full h-36 sm:h-40 rounded-md overflow-hidden border border-gray-200 bg-gray-50">
                    <Image
                      src={algorithm.image}
                      alt={algorithm.label}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                </div>

                {expandedDetails[algorithm.id] && (
                  <div className="mt-3 text-xs sm:text-sm text-gray-600">
                    {algorithm.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sound Processing Tab Content */}
      <div className={activeTab === "sound" ? "block" : "hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {soundProcessingAlgorithms.map((algorithm) => (
            <div
              key={algorithm.id}
              className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-3">
                  <div className="flex items-start mt-0.5">
                    <input
                      type="checkbox"
                      id={algorithm.id}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={form.watch("selectedAlgorithms")?.includes(algorithm.id) || false}
                      onChange={(e) => {
                        const currentValues = form.watch("selectedAlgorithms") || [];
                        if (e.target.checked) {
                          form.setValue("selectedAlgorithms", [...currentValues, algorithm.id], { shouldValidate: true });
                        } else {
                          form.setValue(
                            "selectedAlgorithms",
                            currentValues.filter((value: string) => value !== algorithm.id),
                            { shouldValidate: true }
                          );
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <label
                        htmlFor={algorithm.id}
                        className="font-medium text-sm sm:text-base text-gray-900 cursor-pointer line-clamp-2"
                      >
                        {algorithm.label}
                      </label>
                      <button
                        type="button"
                        onClick={() => toggleDetails(algorithm.id)}
                        className="shrink-0 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        {expandedDetails[algorithm.id] ? "Hide" : "Details"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="relative w-full h-36 sm:h-40 rounded-md overflow-hidden border border-gray-200 bg-gray-50">
                    <Image
                      src={algorithm.image}
                      alt={algorithm.label}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                </div>

                {expandedDetails[algorithm.id] && (
                  <div className="mt-3 text-xs sm:text-sm text-gray-600">
                    {algorithm.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {form.formState.errors.selectedAlgorithms && (
        <p className="text-xs sm:text-sm text-red-600 mt-2">
          {form.formState.errors.selectedAlgorithms.message as string}
        </p>
      )}
    </div>
  );
};

export default AlgorithmPreferencesSection;