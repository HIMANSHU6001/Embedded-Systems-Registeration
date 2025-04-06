import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Info } from "lucide-react";
import Image from "next/image";

interface OSPreferencesSectionProps {
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

const OSPreferencesSection: React.FC<OSPreferencesSectionProps> = ({
  form,
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      <div className="flex items-center gap-2 mb-2 sm:mb-4">
        <label className="text-sm sm:text-base font-medium text-gray-900">
          OS Delivery Method
        </label>
        <div className="relative group">
          <Info
            size={16}
            className="text-gray-500 cursor-help hover:text-gray-700"
          />
          <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 w-48 sm:w-64 p-3 bg-gray-800 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-lg">
            <p>
              Choose how you would like the operating system to be delivered and
              configured on your hardware.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row items-start gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
          <div className="flex items-start mt-1">
            <input
              type="radio"
              id="executable"
              value="executable"
              {...form.register("osPreference")}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="executable"
                className="text-sm sm:text-base font-medium text-gray-900"
              >
                Executable File (CEXR file on Desktop)
              </label>
              <p className="text-xs sm:text-sm text-gray-600">
                The OS has a special file (called EXR) on the desktop; on
                clicking, a pre-written code will automatically start running.
                You can still use other things like browsing files, Chrome, etc.
                It&apos;s will be a mini CPU for you, and you can control when
                to start the code.
              </p>
              <div className="mt-2">
                <div className="relative w-full h-40 sm:h-48 rounded-md overflow-hidden border border-gray-200">
                  <Image
                    src="/assets/fig4.png"
                    alt="Executable file"
                    width={200}
                    height={200}
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
          <div className="flex items-start mt-1">
            <input
              type="radio"
              id="auto-booted"
              value="autoBooted"
              {...form.register("osPreference")}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="auto-booted"
                className="text-sm sm:text-base font-medium text-gray-900"
              >
                Auto Booted (Plug and Play)
              </label>
              <p className="text-xs sm:text-sm text-gray-600">
                We will pre-process the OS in such a way that on powering the
                device, a specific code will start running automatically to
                display and other necessary equipment like a mouse and keyboard.
                The device will automatically do its job.
              </p>
              <div className="mt-2">
                <div className="relative w-full h-40 sm:h-48 rounded-md overflow-hidden border border-gray-200">
                  <Image
                    src="/assets/fig5.png"
                    alt="Auto booted solution"
                    width={200}
                    height={200}
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OSPreferencesSection;
