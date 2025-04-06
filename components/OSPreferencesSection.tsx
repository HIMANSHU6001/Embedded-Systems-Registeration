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
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <label className="text-sm font-medium">OS Delivery Method</label>
        <div className="relative group">
          <Info size={16} className="text-gray-400 cursor-help" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <p className="max-w-xs">
              Choose how you would like the operating system to be delivered and
              configured on your hardware.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start space-x-3 p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
          <div className="flex items-center h-5">
            <input
              type="radio"
              id="executable"
              value="executable"
              {...form.register("osPreference")}
              className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-1.5 flex-1">
            <label htmlFor="executable" className="font-medium">
              Executable File (CEXR file on Desktop)
            </label>
            <p className="text-sm text-gray-500">
              The OS has a special file (called EXR) on the desktop; on
              clicking, a pre-written code will automatically start running. You
              can still use other things like browsing files, Chrome, etc.
              It&apos;s will be a mini CPU for you, and you can control when to
              start the code.
            </p>
            <div className="mt-2">
              <Image
                src="assets/fig4.png"
                alt="Executable file"
                className=" h-32 object-cover rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
          <div className="flex items-center h-5">
            <input
              type="radio"
              id="auto-booted"
              value="autoBooted"
              {...form.register("osPreference")}
              className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-1.5 flex-1">
            <label htmlFor="auto-booted" className="font-medium">
              Auto Booted (Plug and Play)
            </label>
            <p className="text-sm text-gray-500">
              We will pre-process the OS in such a way that on powering the
              device, a specific code will start running automatically to
              display and other necessary equipment like a mouse and keyboard.
              The device will automatically do its job.
            </p>
            <div className="mt-2">
              <Image
                src="assets/fig5.png"
                alt="Auto booted solution"
                className=" h-32 object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OSPreferencesSection;
