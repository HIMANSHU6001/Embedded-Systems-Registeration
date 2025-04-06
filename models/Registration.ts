import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    countryCode: { type: String },
    affiliation: { type: String },
    osPreference: { type: String },
    selectedAlgorithms: [{ type: String }],
    solutionCategory: { type: String },
    userCategory: { type: String },
  },
  { timestamps: true }
);

// Prevent model overwrite on hot reload in dev
export default mongoose.models.Registration || mongoose.model("Registration", RegistrationSchema);
