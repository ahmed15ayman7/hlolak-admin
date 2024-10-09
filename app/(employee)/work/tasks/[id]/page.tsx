"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { selectUser } from "@/lib/redux/userSlice";
import {
  IService,
  getService,
  updateServiceState,
} from "@/lib/actions/service.actions";
import styles from "@/components/ui/dashboard/transactions/transactions.module.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  // ServiceFormValues,
  ServiceFormValues2,
  // serviceSchema,
  serviceSchema2,
} from "@/lib/validations/servicesSchemas";
import Loader from "@/components/shared/Loader";
import { toast } from "react-toastify";
import { setLoad } from "@/lib/redux/LoadSlice";
import { useDispatch } from "react-redux";
import ServicesRevsionForm from "@/components/forms/servicesRevsion";
const ServicesPage = ({ params }: { params: { id: string } }) => {
  const [service, setServices] = useState<IService>();
  const [loading, setLoading] = useState(true);
  const id = params.id;
  let dispatch = useDispatch();
  const user = useSelector(selectUser);
  const path = usePathname();
  const router = useRouter();

  const form = useForm<ServiceFormValues2>({
    resolver: zodResolver(serviceSchema2),
    defaultValues: {
      name: "",
      mobile: "",
      salary: "",
      employer: "",
      provided_service_type: "",
      has_debts: "",
      note: "",
      state: "created",
      bank: "",
      stop: "",
      appointment_date: "",
      id_number: "",
      property_value: "",
      property_status: "",
      property_age: "",
      net_salary: "",
      gross_salary: "",
    },
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const service = await getService(id);
        if (service) {
          setServices(service);
          form.reset({
            ...service,
            state: service.state,
            note: "", // Reset note field
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id, form]);
  const onSubmit = async (data: ServiceFormValues2) => {
    setLoading(true);
    const loadingToastId = toast.loading("Uploading file, please wait...");
    try {
      const updatedService: IService | null = await updateServiceState(
        service?._id!,
        data.state,
        user.name,
        service?.name!,
        data.note || "",
        user._id,
        data.bank,
        data.stop,
        data.appointment_date,
        data.id_number,
        data.property_value,
        data.property_status,
        data.property_age,
        data.net_salary,
        data.gross_salary
      );
      setServices(updatedService!);
      toast.update(loadingToastId, { render: "File uploaded successfully!", type: "success", isLoading: false, autoClose: 3000 });
      setLoading(false);
      dispatch(setLoad(Math.random()));
      form.reset({ ...updatedService, note: "" });
      router.replace("/work/tasks");
    } catch (error) {
      console.error(error);
    }
  };

  return service ? (
    <div
      className="container mx-auto p-6 shadow-md rounded-lg"
      style={{ direction: "rtl" }}>
      {loading && <Loader is />}
      {/* <h1 className="text-3xl justify-center font-extrabold text-white mb-20 flex gap-5">

        <span
            className={`${styles.status} ${
              service.state === "pending"
              ? styles.pending
              : service.state === "done"
              ? styles.done
              : service.state === "canceled"
              ? styles.cancellede
              : service.state === "created"
              ? styles.created
              : ""
            }`}>
            {translateState(service.state)}
          </span>
              {service.name}
      </h1> */}
        <ServicesRevsionForm params={{
        id: id
      }}/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">اسم العميل</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full text-[#000000]"
                      placeholder="اسم العميل"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">رقم الجوال</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full text-[#000000]"
                      placeholder="رقم الجوال"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">جهة العمل</FormLabel>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="جهة العمل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>جهة العمل</SelectLabel>
                        <SelectItem value="private_sector">قطاع خاص</SelectItem>
                        <SelectItem value="retired">متقاعد</SelectItem>
                        <SelectItem value="civilian">مدني</SelectItem>
                        <SelectItem value="military">عسكري</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">الراتب</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full text-[#000000]"
                      placeholder="الراتب"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="provided_service_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">نوع الخدمة المقدمة</FormLabel>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="نوع الخدمة المقدمة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>نوع الخدمة المقدمة</SelectLabel>
                        <SelectItem value="purchase">شراء</SelectItem>
                        <SelectItem value="mortgage">رهن</SelectItem>
                        <SelectItem value="self_construction">
                          بناء ذاتي
                        </SelectItem>
                        <SelectItem value="co_applicant">تضامن</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">البنك</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full text-[#000000]"
                      placeholder="البنك"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appointment_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">تاريخ التعيين</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full text-[#000000]"
                      placeholder="تاريخ التعيين"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="id_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">رقم الهوية</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full text-[#000000]"
                      placeholder="رقم الهوية"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="property_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">قيمة العقار</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full text-[#000000]"
                      placeholder="قيمة العقار"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="property_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">حالة العقار</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full text-[#000000]"
                      placeholder="حالة العقار"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="property_age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">عمر العقار</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full text-[#000000]"
                      placeholder="عمر العقار"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="net_salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">الراتب الصافي</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full text-[#000000]"
                      placeholder="الراتب الصافي"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gross_salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">الراتب الاجمالي</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full text-[#000000]"
                      placeholder="الراتب الاجمالي"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_debts"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-white">
                    هل يوجد عليك التزامات أو ديون؟
                  </Label>
                  <RadioGroup
                    className="flex justify-end"
                    defaultValue={field.value}
                    onChange={field.onChange}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">نعم</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">لا</Label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">هل يوجد إيقاف</FormLabel>
                  <RadioGroup
                    className="flex justify-end"
                    defaultValue={field.value}
                    onChange={field.onChange}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">نعم</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">لا</Label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
          <div className="w-full px-4 mb-6">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="note" className="text-white">
                    اضافة ملاحظة
                  </Label>
                  <FormControl>
                    <Input
                      id="note"
                      {...field}
                      className="w-full text-[#000000]"
                      placeholder="ملاحظة"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-6 flex  items-start justify-center md:items-center mt-5 gap-20">
            <Button type="submit" onClick={() => form.setValue("state", "done")} className={styles.done}>
              تمت
            </Button>
            <Button
              type="submit"
              className={styles.cancellede}
              onClick={() => form.setValue("state", "canceled")}>
              رفض
            </Button>
            <Button
              type="submit"
              className={styles.pending}
              onClick={() => form.setValue("state", "pending")}>
              جاريه
            </Button>
          </div>
        </form>
      </Form>
    </div>
  ) : (
    <></>
  );
};

export default ServicesPage;



const translateState = (value: string) => {
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
