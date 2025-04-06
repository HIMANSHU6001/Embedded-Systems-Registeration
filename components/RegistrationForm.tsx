import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserInformationSection from "./UserInformationSection";
import SolutionCategorySection from "./SolutionCategorySection";
import OSPreferencesSection from "./OSPreferencesSection";
import AlgorithmPreferencesSection from "./AlgorithmPreferencesSection";
import SummarySection from "./SummarySection";
import StepIndicator from "./StepIndicator";
import Image from "next/image";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z
    .string()
    .min(6, { message: "Please enter a valid phone number" }),
  countryCode: z.string().min(1, { message: "Country code is required" }),
  affiliation: z.string().min(2, { message: "Affiliation is required" }),
  userCategory: z.enum(["professor", "industrialist", "enthusiast", "other"]),

  solutionCategory: z.enum([
    "withOsWithoutHardware",
    "withoutHardwareWithOs",
    "withBothOsAndHardware",
    "customizable",
  ]),

  osPreference: z.enum(["executable", "autoBooted"]).optional(),

  selectedAlgorithms: z
    .array(z.string())
    .min(1, { message: "Please select at least one algorithm" }),
});

export type FormValues = z.infer<typeof formSchema>;

const TOTAL_STEPS = 5;

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showOsPreferences, setShowOsPreferences] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      countryCode: "",
      affiliation: "",
      userCategory: "professor",
      solutionCategory: "withOsWithoutHardware",
      selectedAlgorithms: [],
    },
    mode: "onChange",
  });

  const solutionCategory = form.watch("solutionCategory");

  React.useEffect(() => {
    const hasOs = [
      "withOsWithoutHardware",
      "withoutHardwareWithOs",
      "withBothOsAndHardware",
    ].includes(solutionCategory);
    setShowOsPreferences(hasOs);

    if (!hasOs) {
      form.setValue("osPreference", undefined);
    }
  }, [solutionCategory, form]);

  // Custom toast notification
  const showToast = (title: string, description: string) => {
    setToast({ title, description });
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showToast(
          "Registration Successful!",
          "Thank you for submitting your preferences."
        );
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        showToast(
          "Error",
          errorData.error || "Failed to save your registration."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("Error", "Failed to save your registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    let canProceed = false;

    if (currentStep === 1) {
      const result = await form.trigger([
        "fullName",
        "email",
        "phoneNumber",
        "countryCode",
        "affiliation",
        "userCategory",
      ]);
      canProceed = result;
    } else if (currentStep === 2) {
      const result = await form.trigger(["solutionCategory"]);
      canProceed = result;
    } else if (currentStep === 3) {
      if (showOsPreferences) {
        const result = await form.trigger(["osPreference"]);
        canProceed = result;
      } else {
        canProceed = true;
      }
    } else if (currentStep === 4) {
      const result = await form.trigger(["selectedAlgorithms"]);
      canProceed = result;
    } else if (currentStep === 5) {
      canProceed = true;
    }

    if (canProceed) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  if (isSubmitted) {
    return (
      <div className="container py-10">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="text-center py-10">
            <h1 className="text-2xl font-bold text-blue-500 mb-4">
              Thank You for Registering!
            </h1>
            <p className="text-lg mb-6">
              Your preferences have been successfully submitted.
            </p>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
              <p className="text-green-800">
                If you want to be part of our embedded systems community, do
                contact us on WhatsApp at{" "}
                <span className="font-bold">1234567890</span>
              </p>
            </div>

            <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200 text-left">
              <h3 className="text-lg font-semibold mb-2 text-blue-700">
                Have a custom project idea?
              </h3>
              <p className="text-blue-600 mb-4">
                If you have any problem statement or any creative idea that can
                bring one or more algorithms together to solve a real-world or
                social problem, reach us on WhatsApp.
              </p>
              <p className="text-blue-600 mb-2">
                We would love to discuss and if needed, we will also share some
                reference or research work.
              </p>
              <p className="font-bold text-blue-700">Contact us: +1234567890</p>
            </div>

            <div className="flex flex-col items-center justify-center mt-6">
              <Image
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                alt="Join our community"
                className="w-64 h-48 object-cover rounded-lg mb-4"
              />
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  form.reset();
                }}
                className="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
              >
                Submit Another Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-500">
            Embedded Systems Solutions Registration
          </h1>
          <p className="text-gray-500 mt-2">
            Please complete this form to register your embedded system solution
            preferences for professors, industrialists, tech enthusiasts, and
            others
          </p>
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {currentStep === 1 && (
            <div className="mb-8 p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 text-blue-500">
                User Information
              </h2>
              <UserInformationSection form={form} />
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Step 1/5 - User Information
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mb-8 p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 text-blue-500">
                Solution Category
              </h2>
              <SolutionCategorySection form={form} />
              <div className="mt-6 flex justify-between items-center">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <div className="text-sm text-gray-500">
                  Step 2/5 - Solution Selection
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mb-8 p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 text-blue-500">
                Operating System Preferences
              </h2>
              {showOsPreferences ? (
                <OSPreferencesSection form={form} />
              ) : (
                <p className="text-center py-4 text-gray-500">
                  No OS preferences needed for your selection. Click Next to
                  continue.
                </p>
              )}
              <div className="mt-6 flex justify-between items-center">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <div className="text-sm text-gray-500">
                  Step 3/5 - OS Preferences
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="mb-8 p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 text-blue-500">
                Algorithm Preferences
              </h2>
              <AlgorithmPreferencesSection form={form} />
              <div className="mt-6 flex justify-between items-center">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <div className="text-sm text-gray-500">
                  Step 4/5 - Algorithm Selection
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="mb-8 p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 text-blue-500">
                Registration Summary
              </h2>
              <SummarySection
                form={form}
                showOsPreferences={showOsPreferences}
              />
              <div className="mt-6 flex justify-between items-center">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <div className="text-sm text-gray-500">Step 5/5 - Summary</div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed inline-flex items-center"
                >
                  {isSubmitting && (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  Submit Registration
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Custom Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-md animate-fade-in z-50">
          <div className="flex items-start">
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">{toast.title}</p>
              <p className="mt-1 text-sm text-gray-500">{toast.description}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setToast(null)}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
