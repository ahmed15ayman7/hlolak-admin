import React from "react";
import { Input } from "../ui/input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { serviceValidation } from "@/lib/validation";
import { SelectGroup } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import { addService, assignEmployeeToService } from "@/lib/actions/service.actions";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUser } from "@/lib/redux/userSlice";

const ServiceForm = ({ NameService,emp }: { NameService?: string,emp?:boolean }) => {
  let navigation = useRouter();
  let path=usePathname()
  let user =useSelector(selectUser)
  let form = useForm<z.infer<typeof serviceValidation>>({
    resolver: zodResolver(serviceValidation),
    defaultValues: {
      mobile: "",
      name: "",
      salary: "",
      employer: "",
      provided_service_type: NameService || "",
      has_debts: "",
    },
  });

  async function onsubmit(data: z.infer<typeof serviceValidation>) {
    try {
    let service=  await addService({
        name: data.name,
        mobile: data.mobile,
        employer: data.employer,
        salary: +data.salary,
        provided_service_type: data.provided_service_type,
        has_debts: data.has_debts,
      });
      emp && await assignEmployeeToService({serviceId:service?._id,employeeId:user._id,path,newState:service.state})
      console.log("Service created successfully");
      form.reset();
      navigation.replace(emp?"/work/tasks":"/dashboard/services");
    } catch (error) {
      console.log("Failed to create service:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        className="p-6 pt-0 rounded overflow-scroll w-full sm:shadow-2xl grid grid-cols-1 sm:grid-cols-2 gap-4"
        onSubmit={form.handleSubmit(onsubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-white"> الاسم</FormLabel>
              <FormControl>
                <Input
                  placeholder={` الاسم`}
                  type="text"
                  className=" account-form_input"
                  name={field.name}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                  value={field.value}
                  ref={field.ref}
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
              <FormLabel className=" text-white"> رقم الجوال</FormLabel>
              <FormControl>
                <PhoneInput
                  className={`account-form_input px-2 bg-gray-100 w-full outline-none border rounded-lg h-10 relative transition-all `}
                  name={field.name}
                  disabled={field.disabled}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
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
              <Select
                name={field.name}
                disabled={field.disabled}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
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
              <FormControl>
                <Input
                  placeholder={` الراتب`}
                  type="text"
                  className=" account-form_input"
                  name={field.name}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                  value={field.value}
                  ref={field.ref}
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
              <Select
                name={field.name}
                disabled={field.disabled}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="نوع الخدمة المقدمة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>نوع الخدمة المقدمة</SelectLabel>
                    <SelectItem value="purchase">شراء</SelectItem>
                    <SelectItem value="mortgage">رهن</SelectItem>
                    <SelectItem value="self_construction">بناء ذاتي</SelectItem>
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
          name="has_debts"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <Label className="radio_buttons required">
                هل يوجد عليك التزامات أو ديون؟
              </Label>
              <RadioGroup
                className="flex justify-end"
                onChange={(e: any) => {
                  field.onChange(e);
                }}
                name={field.name}
                onBlur={field.onBlur}
                ref={field.ref}
                disabled={field.disabled}
                defaultValue={field.value}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">نعم</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">لا</Label>
                </div>
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-[#5d57c9] hover:bg-[#5d57c9]/80 w-full my-5 col-span-full">
          اضافة
        </Button>
      </form>
    </Form>
  );
};

export default ServiceForm;
