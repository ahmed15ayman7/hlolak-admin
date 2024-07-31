"use client";

import { FaPaperclip } from "react-icons/fa";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { setLoad } from "@/lib/redux/LoadSlice";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import * as XLSX from "xlsx";
import { addServiceEXcel } from "@/lib/actions/service.actions";
import Loader from "../shared/Loader";
import { toast } from "react-toastify";

const schema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) =>
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      {
        message: "Please upload a valid Excel file",
      }
    ),
});

// Define the form data type
type FormData = z.infer<typeof schema>;

const UploadExcelForm: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      file: undefined,
    },
  });
  let dispatch = useDispatch();
  const [hover, setHover] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  let [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (values: FormData) => {
    try {
      setLoading(true);
      const file = values.file;

      const reader = new FileReader();
      reader.onload = async (e) => {
        const loadingToastId = toast.loading("Uploading file, please wait...");
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          let pending = "متابع";
          let services = json.map((e: any) => ({
            name: e[`${Object.keys(e!)[0]}`],
            mobile: `${e[`${Object.keys(e!)[1]}`]}`,
            employee: e[`${Object.keys(e!)[2]}`],
            communication: e[`${Object.keys(e!)[3]}`],
            state: e[`${Object.keys(e!)[4]}`].includes(pending)?"pending":"created",
            notes: {note:e[`${Object.keys(e!)[5]}`],name: e[`${Object.keys(e!)[2]}`],state:e[`${Object.keys(e!)[4]}`]===pending||e[`${Object.keys(e!)[4]}`]===pending.trim()?"pending":"created"},
          }));
          console.log(services);
          await addServiceEXcel(services);
          toast.update(loadingToastId, { render: "File uploaded successfully!", type: "success", isLoading: false, autoClose: 3000 });
          setLoading(false);
          dispatch(setLoad(Math.random()));
          form.reset();
          setFileName(null);
        } catch (error) {
          toast.update(loadingToastId, { render: "Error uploading file.", type: "error", isLoading: false, autoClose: 3000 });
          console.error("Error uploading file:", error);
          setLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      toast.error("Error processing file.");
      console.error("Error processing file:", error);
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      form.setValue("file", file);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
      {loading && <Loader is />}
        <div className="relative">
          <div
            className="bg-[#008080] p-4 rounded-md"
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}>
            <FaPaperclip color="#ffffff" />
          </div>
          <p
            className={`absolute -top-10 left-1/2 -translate-x-1/2 z-50 w-94 text-nowrap rounded-md bg-[#00000060] ${
              hover ? "" : "hidden"
            }`}>
            ارفاق ملف اكسيل
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#182237]">
        <DialogHeader>
          <DialogTitle className="text-center">تحميل مرفق اكسيل</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 pt-6">
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center gap-4">
                      <FormLabel htmlFor="file">Select File</FormLabel>
                      <FormControl>
                        <input
                          type="file"
                          accept=".xlsx"
                          ref={field.ref}
                          onBlur={field.onBlur}
                          name={field.name}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFileChange(e);
                          }}
                          className="flex h-10 text-[#000000] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </FormControl>
                      <FormMessage />
                      {fileName && (
                        <span className="text-green-600">
                          Selected file: {fileName}
                        </span>
                      )}
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-[#008080] hover:bg-[#00808090] w-full my-5">
                  Upload
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UploadExcelForm;
