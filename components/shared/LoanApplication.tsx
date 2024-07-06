"use client";
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

const LoanApplication = () => {
  let form = useForm<z.infer<typeof serviceValidation>>({
    resolver: zodResolver(serviceValidation),
  });
  let onSubmit = () => {};
  return (
    <section className="blog text-gray-700 body-font flex items-center justify-center">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            تقدم بطلبك الآن
          </h1>
        </div>
        <div
          className="flex flex-nowrap sm:-m-4 -mx-4 -mb-10 -mt-4 justify-center items-center"
          data-aos="fade-down">
          <div className="w-full mx-auto sm:py-6 sm:w-4/5 md:w-4/5 lg:w-11/12 xl:max-w-2xl mb-6">
            <Form {...form}>
              <form
                className="simple_form p-6 pt-0 bg-white rounded overflow-scroll sm:shadow-2xl"
                onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center py-4">
                  <img
                    className="md:w-120 md:-m-32"
                    src="https://holoolak.com/assets/holoolak_company_logo-fbf516f6af84aea561274ece952ac5827d50fe364275bb06c03631114aec8721.svg"
                    alt="Company Logo"
                  />
                </div>
                <hr className="border -mx-6" />
                <h2 className="text-lg text-center pt-10 pb-6">
                  تمويلك العقاري علينا!
                </h2>
                <div className="input string required lead_name mb-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-black"> الاسم</FormLabel>
                        <FormControl>
                          <Input placeholder={` الاسم`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="input string required lead_mobile mb-6">
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-black">
                          {" "}
                          رقم الجوال
                        </FormLabel>
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
                </div>
                <div className="input select required lead_employer mb-6">
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                          <Select
                            name={field.name}
                            disabled={field.disabled}
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="جهة العمل" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>جهة العمل</SelectLabel>

                                <SelectItem value="private_sector">
                                  قطاع خاص
                                </SelectItem>
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
                </div>
                <div className="input string required lead_salary mb-6">
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel className=" text-black"> الراتب</FormLabel> */}
                        <FormControl>
                          <Input placeholder={` الراتب`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="input select required w-full lead_salary_bank mb-6">
                  <FormField
                    control={form.control}
                    name="salary_bank"
                    render={({ field }) => (
                      <FormItem>

                          <Select
                            name={field.name}
                            disabled={field.disabled}
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                            <SelectTrigger className=" w-full">
                              <SelectValue
                                className=" w-full"
                                placeholder="بنك إيداع الراتب "
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>بنك إيداع الراتب</SelectLabel>
                                <SelectItem value="alrajhi">الراجحي</SelectItem>
                                <SelectItem value="alriyadh">الرياض</SelectItem>
                                <SelectItem value="alahli">الأهلي</SelectItem>
                                <SelectItem value="albilad">البلاد</SelectItem>
                                <SelectItem value="alistethmar">
                                  الإستثمار
                                </SelectItem>
                                <SelectItem value="alawwal">الأول</SelectItem>
                                <SelectItem value="sab">ساب</SelectItem>
                                <SelectItem value="alinma">الإنماء</SelectItem>
                                <SelectItem value="alfaransi">
                                  الفرنسي
                                </SelectItem>
                                <SelectItem value="alarabi">العربي</SelectItem>
                                <SelectItem value="aljazerah">
                                  الجزيرة
                                </SelectItem>
                                <SelectItem value="samba">سامبا</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="input string required lead_age mb-6">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel className=" text-black"> العمر</FormLabel> */}
                        <FormControl>
                          <Input placeholder={` العمر`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="input select required lead_provided_service_type mb-6">
                  <FormField
                    control={form.control}
                    name="provided_service_type"
                    render={({ field }) => (
                      <FormItem>

                          <Select
                            name={field.name}
                            disabled={field.disabled}
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="نوع الخدمة المقدمة" />
                            </SelectTrigger>
                            <SelectContent >
                              <SelectGroup>
                                <SelectLabel>نوع الخدمة المقدمة</SelectLabel>

                                <SelectItem value="purchase">شراء</SelectItem>
                                <SelectItem value="mortgage">رهن</SelectItem>
                                <SelectItem value="self_construction">
                                  بناء ذاتي
                                </SelectItem>
                                <SelectItem value="co_applicant">
                                  تضامن
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="input radio_buttons required lead_has_debts mb-6">
                  <Label className="radio_buttons required">
                    هل يوجد عليك التزامات أو ديون؟
                  </Label>
                  <RadioGroup>
                    <div style={{direction:"rtl"}} className="flex gap-3 items-center space-x-2">
                      <RadioGroupItem value="yes" id="option-one" />
                      <Label htmlFor="option-one">نعم</Label>
                    </div>
                    <div style={{direction:"rtl"}} className="flex gap-3 items-center space-x-2">
                      <RadioGroupItem value="no" id="option-two" />
                      <Label htmlFor="option-two">لا</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="pt-6 flex justify-between">
                  <Input
                    type="submit"
                    name="commit"
                    value="ارسال"
                    className="btn-blue"
                    data-disable-with="ارسال"
                  />
                  {/* <Link target="_blank" className="text-xs self-end" href="/terms_and_conditions">
                  سياسة الخصوصية
                </Link> */}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanApplication;
