"use client";

import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GalleryFormValues,
  gallerySchema,
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
import Image from "next/image";
import  { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/uploadthing";
import { addGalleryItem } from "@/lib/actions/Gallery.actions";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const AddGalleryForm = ({setReload}:{setReload:any}) => {
  let path = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("mediaPost");
  // const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onSubmit = async (values: GalleryFormValues) => {
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
      await addGalleryItem({
        imageUrl: values.imageUrl,
        title: values.title,
        path: path,
      });
      
      form.reset();
      setReload(Math.random())
      
      // reader.readAsDataURL(blob);
    } catch (error) {
      console.log("Error adding gallery item:", error);
    }
  };

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      title: "",
      imageUrl: "",
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

  // const handleCropComplete = async (
  //   croppedAreaPixels: Area,
  //   fieldChange: (value: string) => void,
  //   imageUrl: string
  // ) => {
  //   const croppedImg = await getCroppedImg(imageUrl, croppedAreaPixels!);
  //   const blob = croppedImg;
  //   const reader = new FileReader();
  //   if (blob) {
  //     const file = blob;
  //     setFiles([file]);
  //     if (!file.type.includes("image")) return;
  //     reader.onload = async (e) => {
  //       const imageDataUrl = e.target?.result?.toString() || "";
  //       fieldChange(imageDataUrl);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  //   // setCroppedAreaPixels(croppedAreaPixels);
  // };

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
                // <ImageCropper
                //   image={field.value}
                //   onChange={field.onChange}
                //   value={field.value}
                //   onCropComplete={(e: Area) =>
                //     handleCropComplete(e, field.onChange, field.value)
                //   }
                // />
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
          <Label htmlFor="title">عنوان الصوره</Label>
          <Input
            id="title"
            {...form.register("title")}
            placeholder="ادخل عنوان الصوره"
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
          اضافة الي معرض الصور
        </Button>
      </form>
    </Form>
  );
};

export default AddGalleryForm;
