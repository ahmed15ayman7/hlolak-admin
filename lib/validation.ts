import { z } from "zod";

const serviceValidation = z.object({
  name: z
    .string()
    .min(1, "الاسم مطلوب")
    .max(100, "الاسم طويل جداً"),
  mobile: z
    .string()
    .min(1, "رقم الجوال مطلوب")
    .refine((val) => val.match(/^\+[1-9]{1}[0-9]{3,14}$/), {
      message: "رقم الجوال غير صالح",
    }),
  employer: z
    .string()
    .nonempty("جهة العمل مطلوبة"),
  salary: z
    .number()
    .min(1, "الراتب مطلوب")
    .positive("الراتب يجب أن يكون قيمة موجبة"),
  salary_bank: z
    .string()
    .nonempty("بنك إيداع الراتب مطلوب"),
  age: z
    .number()
    .min(18, "العمر يجب أن يكون 18 سنة على الأقل")
    .max(70, "العمر يجب أن يكون 70 سنة على الأكثر"),
  provided_service_type: z
    .string()
    .nonempty("نوع الخدمة المقدمة مطلوب"),
  has_debts: z
    .string()
    .nonempty("الإجابة على هذا السؤال مطلوبة"),
});

export { serviceValidation };
