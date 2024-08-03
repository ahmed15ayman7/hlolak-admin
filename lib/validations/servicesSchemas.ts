import { z } from "zod";

export const serviceSchema = z.object({
    name: z.string().min(1, "Name is required"),
    mobile: z.string().min(1, "Mobile is required"),
    salary: z.string().min(1, "Salary is required"),
    employer: z.string().min(1, "Employer is required"),
    provided_service_type: z.string().min(1, "Service type is required"),
    has_debts: z.string().min(1, "Debt status is required"),
    note: z.string().optional(),
    state: z.enum(["pending", "canceled", "done", "created"]),
    bank: z.string().optional(),
    stop: z.string().optional(),
    appointment_date: z.string().optional(),
    id_number: z.string().optional(),
    property_value: z.string().optional(),
    property_status: z.string().optional(),
    property_age: z.string().optional(),
    net_salary: z.string().optional(),
    gross_salary: z.string().optional(),
  });
  
export type ServiceFormValues = z.infer<typeof serviceSchema>;


export const editSchema = z.object({
  mobile: z.string().optional(),
  employer: z.string().optional(),
  salary: z.string().optional(),
  provided_service_type: z.string().optional(),
  has_debts: z.string().optional(),
  bank: z.string().optional(),
  stop: z.string().optional(),
  appointment_date: z.string().optional(),
  id_number: z.string().optional(),
  property_value: z.string().optional(),
  property_status: z.string().optional(),
  property_age: z.string().optional(),
  net_salary: z.string().optional(),
  gross_salary: z.string().optional(),
  loan_amount: z.string().optional(),
  installment: z.string().optional(),
  duration: z.string().optional(),
});
export type EditSchemaKeys = keyof z.infer<typeof editSchema>;


export const installmentValidation = z.object({
  loan_amount: z.string().nonempty({ message: "يجب إدخال مبلغ التمويل" }),
  installment: z.string().nonempty({ message: "يجب إدخال القسط" }),
  duration: z.string().nonempty({ message: "يجب إدخال المدة" }),
});
export type InstallmentValidation = keyof z.infer<typeof installmentValidation>;