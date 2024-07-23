"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {

  OpinianFormValues,
  opinianSchema,
} from "@/lib/validations/gallerySchema";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";


import { usePathname } from "next/navigation";

import { addTestimonial } from "@/lib/actions/testimonials.actions";
const AddOpinianForm = ({ setReload }: { setReload: any }) => {
  let path = usePathname();



  const onSubmit = async (values: OpinianFormValues) => {
    try {
      await addTestimonial({
        text: values.text,
        author: values.title,
        path: path,
      });

      form.reset();
      setReload(Math.random());

    } catch (error) {
      console.log("Error adding gallery item:", error);
    }
  };

  const form = useForm<OpinianFormValues>({
    resolver: zodResolver(opinianSchema),
    defaultValues: {
      title: "",
      text: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h2 className="text-center  " style={{ fontWeight: "bold" }}>
          {" "}
          اضافة رأيك؟
        </h2>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center gap-4">
              <FormControl className="flex-1 text-base-semibold">
                <Input
                  {...field}
                  placeholder="ادخل رايك"
                  className={` text-[#000000]`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Label htmlFor="title">الاسم</Label>
          <Input
            id="title"
            {...form.register("title")}
            placeholder="ادخل اسمك"
            className={`input ${
              form.formState.errors.title ? "input-error" : ""
            }`}
          />
          {form.formState.errors.title && (
            <p className="text-red-600">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>
        <Button type="submit" className="btn-blue w-full my-5">
          اضافة رايك
        </Button>
      </form>
    </Form>
  );
};

export default AddOpinianForm;
