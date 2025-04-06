import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Info } from "lucide-react";

type RegistrationFormData = {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  affiliation: string;
  selectedAlgorithms: string[];
  solutionCategory:
    | "withOsWithoutHardware"
    | "withoutHardwareWithOs"
    | "withBothOsAndHardware"
    | "customizable";
  userCategory: "professor" | "industrialist" | "enthusiast" | "other";
  osPreferences?: string;
};

interface UserInformationSectionProps {
  form: UseFormReturn<RegistrationFormData>;
}
const UserInformationSection: React.FC<UserInformationSectionProps> = ({
  form,
}) => {
  return (
    <div className="space-y-4">
      {/* Full Name */}
      <div className="space-y-2">
        <label htmlFor="fullName" className="block text-sm font-medium">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          placeholder="Enter your full name"
          {...form.register("fullName")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {form.formState.errors.fullName && (
          <p className="text-sm text-red-500 mt-1">
            {form.formState.errors.fullName.message as string}
          </p>
        )}
      </div>

      {/* Email Address */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email address"
          {...form.register("email")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-500 mt-1">
            {form.formState.errors.email.message as string}
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <label htmlFor="phoneNumber" className="block text-sm font-medium">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">
              +
            </span>
            <input
              id="countryCode"
              type="tel"
              className="pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Country code"
              {...form.register("countryCode")}
            />
            <div className="absolute right-1 top-1/2 -translate-y-1/2 group">
              <Info size={14} className="text-gray-400 cursor-help" />
              <div className="absolute right-0 bottom-full mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <p>Enter country code without +</p>
              </div>
            </div>
          </div>
          <input
            id="phoneNumber"
            type="tel"
            placeholder="Phone number"
            {...form.register("phoneNumber")}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {(form.formState.errors.phoneNumber ||
          form.formState.errors.countryCode) && (
          <p className="text-sm text-red-500 mt-1">
            {(form.formState.errors.phoneNumber?.message as string) ||
              (form.formState.errors.countryCode?.message as string)}
          </p>
        )}
      </div>

      {/* Affiliation */}
      <div className="space-y-2">
        <label htmlFor="affiliation" className="block text-sm font-medium">
          Affiliation <span className="text-red-500">*</span>
        </label>
        <input
          id="affiliation"
          type="text"
          placeholder="University, company, or independent"
          {...form.register("affiliation")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {form.formState.errors.affiliation && (
          <p className="text-sm text-red-500 mt-1">
            {form.formState.errors.affiliation.message as string}
          </p>
        )}
      </div>

      {/* User Category */}
      <div className="space-y-2">
        <label htmlFor="userCategory" className="block text-sm font-medium">
          Category of User <span className="text-red-500">*</span>
        </label>
        <select
          id="userCategory"
          {...form.register("userCategory")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="professor">Professor</option>
          <option value="industrialist">Industrialist</option>
          <option value="enthusiast">Tech Enthusiast</option>
          <option value="other">Other</option>
        </select>
        {form.formState.errors.userCategory && (
          <p className="text-sm text-red-500 mt-1">
            {form.formState.errors.userCategory.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserInformationSection;
