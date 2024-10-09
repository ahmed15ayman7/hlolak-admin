interface services {
  img: string;
  title: string;
  subTitle: string;
  link: string;
  desc: string;
}
export let servicesArray: services[]=[
    {
        img: "https://holoolak.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0FKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ffb44b177f1b55885ed58d33830833e095f6661c/56d1767c-2d24-4728-904b-d07cb3d84626.jpg",
  title: "أرض وقرض",
  subTitle: "في بالك أرض نشتريها لك ونعطيك عليها قرض.",
  link: "/services/leads",
  desc: "منتج يمكنك من شراء الأرض والاستفادة من التمويل عليها بنظام دفعات .",
    },
    {
        img: "https://holoolak.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbjhKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7865091320fc41477fd1cfe97896e63ac4d4451f/d1ad0f32-0d4e-468a-918d-077ed2b1c867.jpg",
  title: "توحيد الاقساط",
  subTitle: "توحيد الالتزامات وحلول المديونيات بضمان العقار",
  link: "/services/Installments",
  desc: "حلول تمكنك من دمج اقساطك المتعددة بقسط واحد مرن ومده أطول.",
    },
    {
        img: "https://holoolak.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbjRKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b71c4897f129639bae98ab2d5301db355f2bdddb/c43e469e-8320-45a7-8b1b-24e82d58fc29.jpg",
  title: "بناء ذاتي",
  subTitle: "بيتك تبنية بكيفك",
  link: "/services/self_construction",
  desc: "نمكنك من بناء منزل أحلامك عبر تمويل سريع وسهل من خلال منتجاتنا في التمويل العقاري.",
    },
    {
        img: "https://holoolak.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbjBKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7dcab70ffbf581e83b244d2651441bbae07664d1/27d5a4ce-9b1d-4ac1-8876-d66b462612ed.jpg",
  title: "التمويل العقاري",
  subTitle: "ابتكار أفضل الحلول التمويلية للعملاء التي تساعدهم على امتلاك منزل العمر.",
  link: "/services/purchase",
  desc: "حلول مرنه وميسرة تتناسب مع جميع شرائح المجتمع .",
    },
    {
        img: "https://holoolak.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbndKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1f8f29f29768e43600bbfee78e0061ef6a9c13cc/bb627dc8-7a29-4aee-a9db-95bc874d6629.jpg",
  title: "الرهن العقاري",
  subTitle: "تمويل بضمان الرهن العقاري الذي يمتلكه العميل وذلك بغرض الحصول على سيولة مالية.",
  link: "/services/mortgage",
  desc: "قرض يتم الحصول عليه بموجب رهن ممتلكات تعود للمقترض كضمان لسداد القرض.",
    },
]

export const translateWorkField = (value: string) => {
  switch (value) {
    case "private_sector":
      return "قطاع خاص";
    case "retired":
      return "متقاعد";
    case "civilian":
      return "مدني";
    case "military":
      return "عسكري";
    default:
      return value;
  }
};


export const translateServiceType = (value: string) => {
  switch (value) {
    case "purchase":
      return "شراء";
    case "mortgage":
      return "رهن";
    case "self_construction":
      return "بناء ذاتي";
    case "co_applicant":
      return "تضامن";
    default:
      return value;
  }
};

export const translateState = (value: string) => {
  switch (value) {
    case "pending":
      return "جارية";
    case "canceled":
      return "رُفضت";
    case "done":
      return "تمت";
    case "created":
      return "جديد";
    default:
      return value;
  }
};

export const DataLableAndKeys = [
  { label: "رقم الجوال", key: "mobile" },
  { label: "جهة العمل", key: "employer" },
  { label: "المرتبة", key: "salary" },
  { label: "نوع الخدمه", key: "provided_service_type" },
  { label: "البنك", key: "bank" },
  { label: "تاريخ الميلاد", key: "appointment_date" },
  { label: "رقم الهوية", key: "id_number" },
  { label: "قيمة العقار", key: "property_value" },
  { label: "حالة العقار", key: "property_status" },
  { label: " مدعوم ؟", key: "property_age" },
  { label: "الراتب الصافي", key: "net_salary" },
  { label: "الراتب الإجمالي", key: "gross_salary" },
  { label: "مبلغ التمويل", key: "loan_amount1" },
  { label: "اجمالي اقساط العميل فترة اولي", key: "loan_amount" },
  { label: "القسط ١", key: "installment" },
  { label: "المدة/شهر ١", key: "duration" },
  { label: "اجمالي اقساط العميل فترة ثانية", key: "loan_amount2" },
  { label: "القسط ٢", key: "installment2" },
  { label: "المدة/شهر ٢", key: "duration2" },
  { label: "اجمالي اقساط العميل فترة ثالثة", key: "loan_amount3" },
  { label: "القسط ٣", key: "installment3" },
  { label: "المدة/شهر ٣", key: "duration3" },
  // { label: "مبلغ التمويل ٤", key: "loan_amount4" },
  // { label: "القسط ٤", key: "installment4" },
  // { label: "المدة/شهر ٤", key: "duration4" },
  { label: "هل يوجد ايقاف؟", key: "stop" },
  { label: "هل يوجد عليه التزامات أو ديون؟", key: "has_debts" },
];
export const DataLableAndKeysUSER = [
  { label: "رقم الجوال", key: "mobile" },
  { label: "جهة العمل", key: "employer" },
  { label: "المرتبة", key: "salary" },
  { label: "نوع الخدمه", key: "provided_service_type" },
  { label: "البنك", key: "bank" },
  { label: "تاريخ الميلاد", key: "appointment_date" },
  { label: "رقم الهوية", key: "id_number" },
  { label: "قيمة العقار", key: "property_value" },
  { label: "حالة العقار", key: "property_status" },
  { label: "الراتب الصافي", key: "net_salary" },
  { label: "الراتب الإجمالي", key: "gross_salary" },
  // { label: "مبلغ التمويل", key: "loan_amount" },
  // { label: "القسط", key: "installment" },
  // { label: "المدة/شهر", key: "duration" },
  { label: " مدعوم ؟", key: "property_age" },
  { label: "هل يوجد ايقاف؟", key: "stop" },
  { label: "هل يوجد عليه التزامات أو ديون؟", key: "has_debts" },
  { label: "مبلغ التمويل", key: "loan_amount1" },
];

export const selectOptions = {
  provided_service_type: [
    { value: "purchase", label: "شراء" },
    { value: "mortgage", label: "رهن" },
    { value: "self_construction", label: "بناء ذاتي" },
    { value: "co_applicant", label: "تضامن" },
  ],
  employer: [
    { value: "private_sector", label: "قطاع خاص" },
    { value: "retired", label: "متقاعد" },
    { value: "civilian", label: "مدني" },
    { value: "military", label: "عسكري" },
  ],
};