import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import Image from "next/image";
import {
  imageProcessingAlgorithms,
  soundProcessingAlgorithms,
} from "./algorithmData";

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
      | "withHardwareWithoutOs"
      | "withBothOsAndHardware"
      | "customizable";
    osPreference?: "executable" | "autoBooted";
  }>;
}

const AlgorithmPreferencesSection: React.FC<
  AlgorithmPreferencesSectionProps
> = ({ form }) => {
  const [expandedDetails, setExpandedDetails] = useState<
    Record<string, boolean>
  >({});
  const [activeTab, setActiveTab] = useState<"image" | "sound">("image");

  const toggleDetails = (algorithmId: string) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [algorithmId]: !prev[algorithmId],
    }));
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header Section */}
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
          Select Your Preferred Algorithms{" "}
          <span className="text-red-500">*</span>
        </h3>
        <p className="text-sm text-gray-600">
          Choose at least one algorithm. You can select multiple options.This
          select algo with be modified as per your preference and will be
          installed inside the hardware kit through OS ( SD card )
        </p>
      </div>

      {/* Tabs - Enhanced for better mobile visibility */}
      <div className="w-full mb-6">
        <div className="grid grid-cols-2 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("image");
            }}
            className={`py-3 px-2 sm:py-3 sm:px-4 text-center text-sm sm:text-base font-medium transition-colors ${
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
            className={`py-3 px-2 sm:py-3 sm:px-4 text-center text-sm sm:text-base font-medium transition-colors ${
              activeTab === "sound"
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Sound Processing
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className={activeTab === "image" ? "block" : "hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {imageProcessingAlgorithms.map((algorithm) => (
            <div
              key={algorithm.id}
              className={`border rounded-xl p-4 transition-all ${
                form.watch("selectedAlgorithms")?.includes(algorithm.id)
                  ? "border-blue-300 bg-blue-50/20"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              } shadow-sm hover:shadow-md`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-3">
                  <div className="flex items-start mt-0.5">
                    <input
                      type="checkbox"
                      id={algorithm.id}
                      className={`w-5 h-5 rounded focus:ring-blue-500 ${
                        form.watch("selectedAlgorithms")?.includes(algorithm.id)
                          ? "text-blue-600 border-blue-300"
                          : "text-gray-600 border-gray-300"
                      }`}
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
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <label
                        htmlFor={algorithm.id}
                        className="font-medium text-base text-gray-900 cursor-pointer line-clamp-2"
                      >
                        {algorithm.label}
                      </label>
                      <button
                        type="button"
                        onClick={() => toggleDetails(algorithm.id)}
                        className="shrink-0 px-3 py-1 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        {expandedDetails[algorithm.id] ? "Hide" : "Details"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
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
                  <div className="mt-4 text-sm text-gray-600 bg-gray-50/50 p-3 rounded-lg">
                    {algorithm.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={activeTab === "sound" ? "block" : "hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2gap-4 sm:gap-6">
          {soundProcessingAlgorithms.map((algorithm) => (
            <div
              key={algorithm.id}
              className={`border rounded-xl p-4 transition-all ${
                form.watch("selectedAlgorithms")?.includes(algorithm.id)
                  ? "border-blue-300 bg-blue-50/20"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              } shadow-sm hover:shadow-md`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-3">
                  <div className="flex items-start mt-0.5">
                    <input
                      type="checkbox"
                      id={algorithm.id}
                      className={`w-5 h-5 rounded focus:ring-blue-500 ${
                        form.watch("selectedAlgorithms")?.includes(algorithm.id)
                          ? "text-blue-600 border-blue-300"
                          : "text-gray-600 border-gray-300"
                      }`}
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
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <label
                        htmlFor={algorithm.id}
                        className="font-medium text-base text-gray-900 cursor-pointer line-clamp-2"
                      >
                        {algorithm.label}
                      </label>
                      <button
                        type="button"
                        onClick={() => toggleDetails(algorithm.id)}
                        className="shrink-0 px-3 py-1 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        {expandedDetails[algorithm.id] ? "Hide" : "Details"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
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
                  <div className="mt-4 text-sm text-gray-600 bg-gray-50/50 p-3 rounded-lg">
                    {algorithm.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {form.formState.errors.selectedAlgorithms && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {form.formState.errors.selectedAlgorithms.message as string}
        </div>
      )}
    </div>
  );
};

export default AlgorithmPreferencesSection;
