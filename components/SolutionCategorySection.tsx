import Image from "next/image";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Wrench } from "lucide-react";
import { FormValues } from "./RegistrationForm";

interface SolutionCategorySectionProps {
  form: UseFormReturn<FormValues>;
}

const SolutionCategorySection: React.FC<SolutionCategorySectionProps> = ({
  form,
}) => {
  return (
    <div className="space-y-4 w-full max-w-3xl mx-auto">
      {/* Option 1: With OS, Without Hardware */}
      <div className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
        <div className="flex items-start mt-0.5">
          <input
            type="radio"
            id="withOsWithoutHardware"
            value="withOsWithoutHardware"
            {...form.register("solutionCategory")}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="withOsWithoutHardware"
              className="font-medium text-base sm:text-lg text-gray-900"
            >
              With OS, Without Hardware
            </label>
            <p className="text-sm text-gray-600">
              We will provide an SD card that has a pre-installed OS and code
              (algorithm, image/voice processing algorithm). Just need to put
              the SD card in an embedded system and power it on. It will detect
              a specific condition (like face, wound) and one of the GPIOs will
              be turned on HIGH. This pin can be further connected with a
              buzzer, LED, motor, etc.
            </p>
            <div className="mt-3">
              <div className="relative w-full h-40 sm:h-48 rounded-md overflow-hidden border border-gray-200 bg-gray-100">
                <Image
                  src="/assets/fig1.png"
                  alt="OS without hardware"
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

      {/* Option 2: With Hardware, Without OS */}
      <div className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
        <div className="flex items-start mt-0.5">
          <input
            type="radio"
            id="withHardwareWithoutOs"
            value="withHardwareWithoutOs"
            {...form.register("solutionCategory")}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="withHardwareWithoutOs"
              className="font-medium text-base sm:text-lg text-gray-900"
            >
              With Hardware, Without OS
            </label>
            <p className="text-sm text-gray-600">
              We will provide the hardware setup, including a touchscreen,
              camera, and microphone. You can install your own operating system
              and software to customize the system as per your requirements.
              This option is ideal for those who want to experiment with their
              own OS and algorithms while using our recommended hardware setup.
            </p>
            <div className="mt-3">
              <div className="relative w-full h-40 sm:h-48 rounded-md overflow-hidden border border-gray-200 bg-gray-100">
                <Image
                  src="/assets/fig3.png"
                  alt="OS only"
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

      {/* Option 3: With Both OS and Hardware */}
      <div className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
        <div className="flex items-start mt-0.5">
          <input
            type="radio"
            id="withBothOsAndHardware"
            value="withBothOsAndHardware"
            {...form.register("solutionCategory")}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="withBothOsAndHardware"
              className="font-medium text-base sm:text-lg text-gray-900"
            >
              With Both OS and Hardware
            </label>
            <p className="text-sm text-gray-600">
              We will deliver a complete package with both hardware and
              software. It will have a complete &quot;system in package&quot;
              with a touchscreen, sound, camera, and integrated processor.
              It&apos;s all ready to use out of the box. Power ON and start
              using it for your AIML experiments.
            </p>
            <div className="mt-3">
              <div className="relative w-full h-40 sm:h-48 rounded-md overflow-hidden border border-gray-200 bg-gray-100">
                <Image
                  src="/assets/fig2.png"
                  alt="Complete package"
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

      {/* Option 4: Customizable Solution */}
      <div className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
        <div className="flex items-start mt-0.5">
          <input
            type="radio"
            id="customizable"
            value="customizable"
            {...form.register("solutionCategory")}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="customizable"
              className="font-medium text-base sm:text-lg text-gray-900"
            >
              Customizable Solution
            </label>
            <p className="text-sm text-gray-600">
              You have a custom requirement, and you need some special features.
              Please contact us on WhatsApp and explain your requirements so we
              can give you a customized solution.
            </p>
            <div className="mt-3 flex justify-center items-center">
              <div className="relative w-full h-40 sm:h-48 rounded-md overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
                <Wrench className="w-16 h-16 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionCategorySection;
