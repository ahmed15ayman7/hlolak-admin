"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Link from "next/link";
import { signUpSchema } from "@/lib/validations/authSchemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Regester } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import {selectUser, setUser } from "@/lib/redux/userSlice";
import { getUserByRedux } from "@/lib/redux/dispatch";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/shared/Loader";
type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  let router = useRouter();
  let path= usePathname()
  const user = useSelector(selectUser);
  let [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getUserByRedux(router, path, user,setLoading);},[]);
    const [first, setfirst] = useState("");
    const form = useForm<SignUpFormValues>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
    });
    
    const onSubmit = async (data: SignUpFormValues) => {
      try {
        let req = await Regester(data);
        if (req.message === "true") {
          localStorage.setItem("user", JSON.stringify(req.user));
          router.replace("/onboarding")
        } else {
          setfirst(req.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    return (
      <div className="min-h-screen flex items-center justify-center ">
        {loading&&<Loader is/>}
      <Form {...form}>
        <form
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-[#fff] flex flex-col gap-3 p-6 rounded shadow-md">
          <div className="flex flex-col   space-y-2 text-center">
            <h1 className="text-3xl text-body-bold  cl-internal-1tpvhd8 tracking-tight">
              Create your account
            </h1>
            <p className="text-sm py-4 text-muted-foreground">
              Welcome! Please fill in the details to get started.
            </p>
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full items-center gap-2">
                  <FormLabel className="flex self-start">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="email"
                      className="no-focus  bg-dark-1 text-[#000]"
                    />
                  </FormControl>
                  <FormMessage />
                  {first.length > 0 && <FormMessage>{first}</FormMessage>}
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full items-center gap-2">
                  <FormLabel className="flex self-start">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="password"
                      className="no-focus bg-dark-1 text-[#000]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full items-center gap-2">
                  <FormLabel className="flex self-start">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="confirmPassword"
                      className="no-focus  bg-dark-1 text-[#000]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="p-2 w-full bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 ">
            Register
          </Button>
          <div className="cl-footerAction cl-footerAction__signIn 🔒️ cl-internal-1rpdi70">
            <span
              className="cl-footerActionText 🔒️ cl-internal-kyvqj0"
              data-localization-key="signIn.start.actionText">
              Don’t have an account?
            </span>
            <Link
              className="cl-footerActionLink 🔒️ cl-internal-1v2koqu"
              data-localization-key="signIn.start.actionLink"
              href="/sign-in">
              Sign in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
