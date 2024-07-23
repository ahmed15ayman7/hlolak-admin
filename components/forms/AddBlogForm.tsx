"use client";

import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogFormValues, blogSchema } from "@/lib/validations/gallerySchema";
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
import Image from "next/image";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/uploadthing";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addOffers } from "@/lib/actions/Offers.actions";
import { Textarea } from "../ui/textarea";
const AddBlogForm = ({ setReload }: { setReload: any }) => {
  let path = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("mediaPost");
  // const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onSubmit = async (values: BlogFormValues) => {
    try {
      console.log("Submit update user ");
      const blob = values.imageUrl;
      const hasImage = isBase64Image(blob);
      if (hasImage) {
        const imageRes = await startUpload(files);
        if (imageRes && imageRes[0].url) {
          values.imageUrl = imageRes[0].url;
        }
      }
      await addOffers({
        imageUrl: values.imageUrl,
        title: values.title,
        disc: values.text,
        path: path,
      });

      form.reset();
      setReload(Math.random());

      // reader.readAsDataURL(blob);
    } catch (error) {
      console.log("Error adding gallery item:", error);
    }
  };

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      text: "",
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <h2 className="text-center  " style={{ fontWeight: "bold" }}>
          {" "}
          اضافة صوره
        </h2>
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center gap-4">
              {field.value ? (
                <Dialog>
                  <DialogTrigger>
                    <Image
                      src={field.value}
                      alt="profile_photo"
                      width={400}
                      height={400}
                      priority
                      className="rounded-xs object-cover"
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
                      <DialogDescription>
                        <Image
                          src={field.value}
                          alt="profile_photo"
                          width={400}
                          height={400}
                          priority
                          className="rounded-xs object-cover"
                        />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ) : (
                <></>
              )}

              <FormLabel className="text-start">اختر الصوره</FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="upload a photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImageChange(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Label htmlFor="title"> اسم المدونه</Label>
          <Input
            id="title"
            {...form.register("title")}
            placeholder="ادخل اسم  المدونه"
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
        <div>
          <Label htmlFor="title"> تفاصيل المدونه</Label>
          <Textarea
            id="text"
            {...form.register("text")}
            placeholder="ادخل تفاصيل المدونه"
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
          اضافة الي المدونات
        </Button>
      </form>
    </Form>
  );
};

export default AddBlogForm;
