import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  employer: { type: String },
  salary: { type: String },
  provided_service_type: { type: String },
  has_debts: { type: String },
  bank: { type: String },
  stop: { type: String },
  appointment_date: { type: String },
  id_number: { type: String },
  property_value: { type: String },
  property_status: { type: String },
  property_age: { type: String },
  net_salary: { type: String },
  gross_salary: { type: String },
  employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  state: { type: String, default: "created" },
  step: { type: String, default: 1 },
  loan_amount: { type: String },
  installment: { type: String },
  duration: { type: String },
  employeeExl: {
    name: { type: String },
  },
  debtInstallments:[
    {
      id:{ type : Number},
      debtInstallment:{ type : String},
      totalDebt:{ type : String},
      description:{ type : String},
    }
  ],
  communication: { type: String },
  notes: [
    {
      note: { type: String },
      name: { type: String },
      state: { type: String },
    },
  ],
});

const Service =
  mongoose.models?.Service || mongoose.model("Service", serviceSchema);
export default Service;
