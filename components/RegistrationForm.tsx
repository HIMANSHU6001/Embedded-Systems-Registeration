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

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(6, { message: "Please enter a valid phone number" }),
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
    type: "success" | "error";
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

  const showToast = (title: string, description: string, type: "success" | "error") => {
    setToast({ title, description, type });
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
          "Thank you for submitting your preferences.",
          "success"
        );
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        showToast(
          "Error",
          errorData.error || "Failed to save your registration.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast(
        "Error", 
        "Failed to save your registration. Please try again.",
        "error"
      );
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header with step indicator */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Embedded Systems Solution Registration
            </h1>
            <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              {currentStep === 1 && <UserInformationSection form={form} />}
              {currentStep === 2 && <SolutionCategorySection form={form} />}
              {currentStep === 3 && showOsPreferences && (
                <OSPreferencesSection form={form} />
              )}
              {currentStep === 4 && <AlgorithmPreferencesSection form={form} />}
              {currentStep === 5 && (
                <SummarySection form={form} showOsPreferences={showOsPreferences} />
              )}

              {/* Navigation buttons */}
              <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    currentStep === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Previous
                </button>

                {currentStep < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors shadow-sm ${
                      isSubmitting || isSubmitted
                        ? "bg-green-500 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : isSubmitted
                      ? "Submitted!"
                      : "Submit Registration"}
                  </button>
                )}
              </div>
            </form>

            {/* Toast notification */}
            {toast && (
              <div
                className={`mt-6 p-4 rounded-lg border ${
                  toast.type === "success"
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {toast.type === "success" ? (
                      <svg
                        className="h-5 w-5 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-red-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">{toast.title}</h3>
                    <p className="text-sm mt-1">{toast.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;