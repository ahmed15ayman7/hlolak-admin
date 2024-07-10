"use client";

import { addUser } from "@/lib/actions/user.actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminValidation } from "@/lib/validations/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/uploadthing";
import { usePathname, useRouter } from "next/navigation";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
const AddUserPage = () => {
  let pathname = usePathname();
  let router = useRouter();
  let { startUpload } = useUploadThing("mediaPost");
  const [files, setFiles] = useState<File[]>([]);
  let form = useForm<z.infer<typeof AdminValidation>>({
    resolver: zodResolver(AdminValidation),
    defaultValues: {
      profile_photo: "",
      name: "",
      username: "",
      email: "",
      password: "",
      ConfirmPassword: "",
      phone: "",
    },
  });
  function handleImageChange(
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) {
    e.preventDefault();
    let readfile = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;
      readfile.onload = async (e) => {
        const imageDataUrl = e.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      readfile.readAsDataURL(file);
    }
  }
  async function onSubmit(values: z.infer<typeof AdminValidation>) {
    try {
      console.log("Submit update user ");
      const blob = values.profile_photo;
      const hasImage = isBase64Image(blob);
      if (hasImage) {
        const imageRes = await startUpload(files);
        if (imageRes && imageRes[0].url) {
          values.profile_photo = imageRes[0].url;
        }
      }
      await addUser({
        type: values.type,
        email: values.email,
        username: values.username,
        name: values.name,
        image: values.profile_photo,
        phone: values.phone,
        password: values.password,
      });
    } catch (error: any) {
      console.log("faild to update user:", error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-8">
        <div className="max-md:block flex justify-between items-center gap-2">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className=" ">
              <div className=" flex items-center gap-4">
                <FormLabel className="flex h-24 w-24 items-center justify-center rounded-full">
                  {field.value ? (
                    <div className="relative aspect-square h-24 w-24  ">
                      <img
                        src={field.value}
                        alt="post image"
                        className="absolute inset-0 w-full h-full rounded-full object-cover"
                      />
                    </div>
                  ) : (
                    <Image
                      className="rounded-full h-24 w-24"
                      src="/preview.webp"
                      alt="profile_photo"
                      width={24}
                      height={24}
                    />
                  )}
                </FormLabel>
                <FormControl className=" flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="upload a photo"
                    className="cursor-pointer border-none bg-transparent  outline-none file:text-gray-500"
                    onChange={(e) => handleImageChange(e, field.onChange)}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className={"w-1/2"}>
              {/* <FormLabel className=' text-white'>Username</FormLabel> */}
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter Email"
                  name={field.name}
                  disabled={field.disabled}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  className="account-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          <div className="max-md:block flex items-center gap-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={"w-1/3"}>
              {/* <FormLabel className=' text-white'>Name</FormLabel> */}
              <FormControl>
                <Input
                  placeholder={`Enter name`}
                  className=" account-form_input"
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
          name="username"
          
          render={({ field }) => (
            <FormItem className={"w-1/3"}>
              {/* <FormLabel className=' text-white'>Username</FormLabel> */}
              <FormControl>
                <Input
                  placeholder="Enter  username"
                  name={field.name}
                  disabled={field.disabled}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  className="account-form_input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className={"w-1/3"}>
              {/* <FormLabel className=' text-white'>Username</FormLabel> */}
              <FormControl>
                <Input
                  placeholder="Enter password"
                  name={field.name}
                  disabled={field.disabled}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  className="account-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
          <div className="max-md:block flex items-center gap-2">
        <FormField
          control={form.control}
          name="ConfirmPassword"
          render={({ field }) => (
            <FormItem className={"w-1/3"}>
              {/* <FormLabel className=' text-white'>Username</FormLabel> */}
              <FormControl>
                <Input
                  placeholder="Enter confirm password"
                  name={field.name}
                  disabled={field.disabled}
                  value={field.value}
                  onChange={(e) => {
                      field.onChange(e);
                    }}
                    className="account-form_input"
                    />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
              <FormItem className={"w-1/3"}>
              {/* <FormLabel className=' text-white'>Name</FormLabel> */}
              <FormControl>
                <PhoneInput
                  className={`account-form_input px-2 bg-gray-100 w-full outline-none border rounded-lg h-10 relative transition-all `}
                  name={field.name}
                  placeholder="Enter phone"
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
          name="type"
          render={({ field }) => (
            <Select
              name={field.name}
              disabled={field.disabled}
              onValueChange={field.onChange}
              defaultValue={field.value}>
              <SelectTrigger className="w-1/3 account-form_input">
                <SelectValue
                  className="flex flex-row gap-5"
                  placeholder="Select user type "
                />
              </SelectTrigger>
              <SelectContent className="account-form_input">
                <SelectGroup>
                  <SelectLabel>Select type user</SelectLabel>

                  <SelectItem value={"employee"}>employee</SelectItem>
                  <SelectItem value={"admin"}>Admin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
            </div>
        <Button
          type="submit"
          className="p-2 w-full bg-[#008080] text-slate-50 hover:bg-[#008080]/70 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 ">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddUserPage;
