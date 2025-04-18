import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserInformationSection from "@/components/UserInformationSection";
import SolutionCategorySection from "@/components/SolutionCategorySection";
import OSPreferencesSection from "@/components/OSPreferencesSection";
import AlgorithmPreferencesSection from "@/components/AlgorithmPreferencesSection";
import SummarySection from "@/components/SummarySection";
import StepIndicator from "@/components/StepIndicator"; // Assuming you have a progress bar component

const TOTAL_STEPS = 5;

export type FormValues = {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  affiliation: string;
  selectedAlgorithms: string[];
  solutionCategory:
    | "withOsWithoutHardware"
    | "withHardwareWithoutOs"
    | "withBothOsAndHardware"
    | "customizable";
  userCategory: "professor" | "industrialist" | "enthusiast" | "other";
  osPreference?: "executable" | "autoBooted";
};

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showOsPreferences, setShowOsPreferences] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});
  
  const form = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
      affiliation: "",
      selectedAlgorithms: [],
      solutionCategory: "withOsWithoutHardware",
      userCategory: "enthusiast",
      osPreference: undefined,
    },
  });

  const solutionCategory = form.watch("solutionCategory");

  useEffect(() => {
    // Determine if OS preferences should be shown
    const hasOs = ["withOsWithoutHardware", "withBothOsAndHardware"].includes(
      solutionCategory
    );
    setShowOsPreferences(hasOs);

    // Clear OS preference if the solution category does not require it
    if (!hasOs) {
      form.setValue("osPreference", undefined);
    }
  }, [solutionCategory, form]);

  const handleNext = async () => {
    let canProceed = false;

    if (currentStep === 1) {
      canProceed = await form.trigger([
        "fullName",
        "email",
        "phoneNumber",
        "countryCode",
        "affiliation",
        "userCategory",
      ]);
    } else if (currentStep === 2) {
      canProceed = await form.trigger(["solutionCategory"]);
    } else if (currentStep === 3) {
      if (showOsPreferences) {
        canProceed = await form.trigger(["osPreference"]);
      } else {
        canProceed = true;
      }
    } else if (currentStep === 4) {
      canProceed = await form.trigger(["selectedAlgorithms"]);
    } else if (currentStep === 5) {
      canProceed = true;
    }

    if (canProceed) {
      // Skip OS preference step if not required
      const nextStep =
        !showOsPreferences && currentStep === 2
          ? currentStep + 2
          : currentStep + 1;
      setCurrentStep(Math.min(nextStep, TOTAL_STEPS));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    // Skip OS preference step if not required
    const prevStep =
      !showOsPreferences && currentStep === 4
        ? currentStep - 2
        : currentStep - 1;
    setCurrentStep(Math.max(prevStep, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmissionStatus({});
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }
      
      setSubmissionStatus({
        success: true,
        message: result.message || 'Registration submitted successfully!',
      });
      
      // Optionally reset form or redirect
      // form.reset();
      // Or redirect using Next.js router
      // router.push('/thank-you');
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to submit registration',
      });
    } finally {
      setIsSubmitting(false);
    }
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
            {/* Submission status message */}
            {submissionStatus.message && (
              <div 
                className={`mb-6 p-4 rounded-lg ${
                  submissionStatus.success 
                    ? 'bg-green-100 text-green-800 border border-green-400' 
                    : 'bg-red-100 text-red-800 border border-red-400'
                }`}
              >
                {submissionStatus.message}
              </div>
            )}
            
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              {currentStep === 1 && <UserInformationSection form={form} />}
              {currentStep === 2 && <SolutionCategorySection form={form} />}
              {currentStep === 3 && showOsPreferences && (
                <OSPreferencesSection form={form} />
              )}
              {currentStep === 4 && <AlgorithmPreferencesSection form={form} />}
              {currentStep === 5 && (
                <SummarySection
                  form={form}
                  showOsPreferences={showOsPreferences}
                />
              )}

              {/* Navigation buttons */}
              <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1 || isSubmitting}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    currentStep === 1 || isSubmitting
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
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:bg-blue-400"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;