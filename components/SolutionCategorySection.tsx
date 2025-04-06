import Image from "next/image";
import React from "react";
import { UseFormReturn } from "react-hook-form";

import { FormValues } from "./RegistrationForm"; // Import the full FormValues type

interface SolutionCategorySectionProps {
  form: UseFormReturn<FormValues>; // Use the full FormValues type
}

const SolutionCategorySection: React.FC<SolutionCategorySectionProps> = ({
  form,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-start space-x-3 p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
        <div className="flex items-center h-5">
          <input
            type="radio"
            id="withOsWithoutHardware"
            value="withOsWithoutHardware"
            {...form.register("solutionCategory")}
            className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
          />
        </div>
        <div className="grid gap-1.5 flex-1">
          <label htmlFor="withOsWithoutHardware" className="font-medium">
            With OS, Without Hardware
          </label>
          <p className="text-sm text-gray-500">
            We will provide an SD card that has a pre-installed OS and code
            (algorithm, image/voice processing algorithm). Just need to put the
            SD card in an embedded system and power it on. It will detect a
            specific condition (like face, wound) and one of the GPIOs will be
            turned on HIGH. This pin can be further connected with a buzzer,
            LED, motor, etc.
          </p>
          <div className="mt-2">
            <Image
              src="assets/fig1.png"
              alt="OS without hardware"
              className=" h-32 object-cover rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="flex items-start space-x-3 p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
        <div className="flex items-center h-5">
          <input
            type="radio"
            id="withoutHardwareWithOs"
            value="withoutHardwareWithOs"
            {...form.register("solutionCategory")}
            className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
          />
        </div>
        <div className="grid gap-1.5 flex-1">
          <label htmlFor="withoutHardwareWithOs" className="font-medium">
            Without Hardware, With OS
          </label>
          <p className="text-sm text-gray-500">
            This is just the OS (operating system), and we will also share
            specific instructions on what hardware to buy and how to set it up.
            After setting it up, it will be something that will have a
            touchscreen, camera, and microphone integrated into it. With that,
            you or your students can detect images and sounds.
          </p>
          <div className="mt-2">
            <Image
              src="assets/fig3.png"
              alt="OS only"
              className=" h-32 object-cover rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="flex items-start space-x-3 p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
        <div className="flex items-center h-5">
          <input
            type="radio"
            id="withBothOsAndHardware"
            value="withBothOsAndHardware"
            {...form.register("solutionCategory")}
            className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
          />
        </div>
        <div className="grid gap-1.5 flex-1">
          <label htmlFor="withBothOsAndHardware" className="font-medium">
            With Both OS and Hardware
          </label>
          <p className="text-sm text-gray-500">
            We will deliver a complete package with both hardware and software.
            It will have a complete &quot;system in package&ldquo; with a
            touchscreen, sound, camera, and integrated processor. It&apos;s all
            ready to use out of the box. Power ON and start using it for your
            AIML experiments.
          </p>
          <div className="mt-2">
            <Image
              src="assets/fig2.png"
              alt="Complete package"
              className=" h-32 object-cover rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="flex items-start space-x-3 p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
        <div className="flex items-center h-5">
          <input
            type="radio"
            id="customizable"
            value="customizable"
            {...form.register("solutionCategory")}
            className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
          />
        </div>
        <div className="grid gap-1.5 flex-1">
          <label htmlFor="customizable" className="font-medium">
            Customizable Solution
          </label>
          <p className="text-sm text-gray-500">
            You have a custom requirement, and you need some special features.
            Please contact us on WhatsApp and explain your requirements so we
            can give you a customized solution.
          </p>
          <div className="mt-2">
            <Image
              src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f"
              alt="Customizable solution"
              className=" h-32 object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionCategorySection;
