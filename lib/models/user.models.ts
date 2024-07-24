import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: "string" },
  type: { type: "string", default: "employee" },
  name: { type: "string" },
  phone: { type: "string" },
  email: { type: "string", required: true },
  password: { type: "string", required: true },
  image: { type: "string" },
  onboarding: { type: "boolean", default: false },
  servicesDone: { type: Number, default: 0 },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;
