import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  employer: { type: String, required: true },
  salary: { type: String, required: true },
  provided_service_type: { type: String, required: true },
  has_debts: { type: String, required: true },
  employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  state: { type: String, default: "created" },
  step: { type: String, default: 1 },
  notes: [{ note: { type: String }, name: { type: String } }],
});
const Service =
  mongoose.models?.Service || mongoose.model("Service", serviceSchema);
export default Service;
