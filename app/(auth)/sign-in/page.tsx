"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { loginSchema } from "@/lib/validations/authSchemas";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginF } from "@/lib/actions/user.actions";
import { selectUser, setUser } from "@/lib/redux/userSlice";
import { getUserByRedux } from "@/lib/redux/dispatch";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/shared/Loader";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const dispatch = useDispatch();
  let router = useRouter();
  let path = usePathname();
  const user = useSelector(selectUser);
  let [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getUserByRedux(router, path, user, setLoading);
  }, [user]);
  const [first, setfirst] = useState("");
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: LoginFormValues) => {
    try {
      let req = await LoginF(data);
      if (req?.message === "Login successful") {
        console.log(req?.message);
        dispatch(setUser(req?.user));
        if (req?.user.type === "admin") {
          router.replace("/dashboard");
        }
        if (req?.user.type === "employee") {
          router.replace("/work");
        }
      } else {
        console.log(req?.message);
        setfirst(req?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      {loading && <Loader is />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-[#fff] p-6 flex flex-col gap-3 px-10 rounded shadow-md w-96">
          <div className="flex flex-col   space-y-2 text-center">
            <h1 className="text-3xl text-body-bold tracking-tight mb-5 text-[#212126] cl-internal-1tpvhd8">
              تسجيل الدخول
            </h1>
            {/* <p className="text-sm py-4 text-muted-foreground">
              
            </p> */}
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full items-center gap-2">
                  <FormLabel className="flex self-start text-[#000000]">
                    البريد الالكتروني
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
                  <FormLabel className="flex self-start text-[#000000]">الرقم السري</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="password"
                      className="no-focus bg-dark-1 text-[#000]"
                    />
                  </FormControl>
                  <FormMessage />
                  {first.length > 0 && <FormMessage>{first}</FormMessage>}
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="p-2 w-full bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 ">
            Login
          </Button>
          {/* <div className="cl-footerAction cl-footerAction__signIn 🔒️ cl-internal-1rpdi70">
            <span
              className="cl-footerActionText 🔒️ cl-internal-kyvqj0"
              data-localization-key="signIn.start.actionText">
              Don’t have an account?
            </span>
            <Link
              className="cl-footerActionLink 🔒️ cl-internal-1v2koqu"
              data-localization-key="signIn.start.actionLink"
              href="/sign-up">
              Sign up
            </Link>
          </div> */}
        </form>
      </Form>
    </div>
  );
}
