"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import Image from "next/image";
import { ChangeEvent, useState ,useEffect} from "react";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";


import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {selectUser, setUser } from "@/lib/redux/userSlice";
import { getUserByRedux } from "@/lib/redux/dispatch";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../shared/Loader";
interface props {
  userData: {
    _id: string | undefined;
    email: string | undefined;
    username: string | null | undefined;
    name: string;
    image: string | undefined;
    phone: string|undefined;
  };
}

const AccountProfile = ({ userData }: props) => {
  const dispatch = useDispatch();
  let router = useRouter();
  let path= usePathname()
  let [disable,SetDis]=useState(false)
  const user = useSelector(selectUser);
  let [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getUserByRedux(router, path, user,setLoading);},[user]);
    let { startUpload } = useUploadThing("mediaPost");
    const [files, setFiles] = useState<File[]>([]);
    let form = useForm<z.infer<typeof UserValidation>>({
      resolver: zodResolver(UserValidation),
      defaultValues: {
        profile_photo: userData?.image || "",
        name: userData?.name || "",
        username: userData?.username ||'',
        phone: userData.phone ||"",
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
    
    async function onSubmit(values: z.infer<typeof UserValidation>) {
      
      let typeUser =values.username.trim().length>5? values.username.trim().slice(-5)==="admin"?"admin":"employee":"employee"
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
        let user=  await updateUser({
          type:typeUser,
          email:userData.email,
          userId: userData._id,
          username: values.username,
          name: values.name,
          image: values.profile_photo,
          phone: values.phone,
          path: path,
        })
        dispatch(setUser(user));
        if (path.includes("/profile/edit")) {
          console.log("Submit update user ");
          router.back();
        } else {
          // if (typeUser==="admin") {
          //   router.replace("/dashboard");
          // }else if (typeUser==="employee") {
          //   router.replace("/work");
          // }
        }
      } catch (error: any) {
        console.log("faild to update user:", error);
      }
    }
    return (
      <Form {...form}>
      {loading&&<Loader is/>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    className="rounded-full max-h-[24px] max-w-[24px]"
                    src="/assets/profile.svg"
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
          name="name"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel className=' text-white'>Name</FormLabel> */}
              <FormControl>
                <Input
                  placeholder={`Enter your name`}
                  className=" account-form_input"
                  name={field.name} disabled={field.disabled}  value={field.value}
                  onChange={e=>{
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
            <FormItem>
              {/* <FormLabel className=' text-white'>Username</FormLabel> */}
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  name={field.name} disabled={field.disabled}  value={field.value}
                  onChange={e=>{
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
            <FormItem>
              {/* <FormLabel className=' text-white'>Name</FormLabel> */}
              <FormControl>
              <PhoneInput
            
                  className={`account-form_input px-2 bg-gray-100 w-full outline-none border rounded-lg h-10 relative transition-all `}
                  name={field.name} disabled={field.disabled}  value={field.value}
                  onChange={e=>{
                    field.onChange(e);
                  }}       />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        
        <Button type="submit" className="p-2 w-full bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 ">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
