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
import {selectUser } from "@/lib/redux/userSlice";
import { getUserByRedux } from "@/lib/redux/dispatch";
import {  useSelector } from "react-redux";
type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  let router = useRouter();
  let path= usePathname()
  const user = useSelector(selectUser);
  useEffect(()=>{
    getUserByRedux(router,path,user)
    
  },[])
  return (
    <div className="min-h-screen flex items-center justify-center ">
    </div>
  );
}
