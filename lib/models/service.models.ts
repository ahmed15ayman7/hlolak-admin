import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  employer: { type: String},
  salary: { type: String},
  provided_service_type: { type: String},
  has_debts: { type: String},
  employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  state: { type: String, default: "created" },
  step: { type: String, default: 1 },
  employeeExl:{
    name:{type: String},
    
  },
  communication: { type: String},
  notes: [{ note: { type: String }, name: { type: String },state:{type:String} }],
});
const Service =
  mongoose.models?.Service || mongoose.model("Service", serviceSchema);
export default Service;
