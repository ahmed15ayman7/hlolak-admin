"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import AccountProfile from "../../../components/forms/AccountProfile";
import { redirect } from "next/navigation";
import React from "react";
import { fetchUser } from '@/lib/actions/user.actions';
interface usData {
  _id: string | undefined;
  email: string | undefined;
  username: string | null | undefined;
  name: string;
  bio: string;
  image: string | undefined;
  phone: string| undefined;
}
const Onboarding =  () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [refrish, setrefrish] = useState<any>(null);
  let navigate =useRouter()
  useEffect(() => {
    let user=JSON.parse(`${localStorage.getItem('user')}`)
    if(!user||user?.login===false) navigate.replace("/sign-in")
      console.log(user.email)
    const fetchData = async () => {
      try {
        if(user.email!==undefined){
          const userInfo = JSON.parse(`${await fetchUser(user.email)}`);
          setUserInfo(userInfo)
          if (userInfo?.onboarding) redirect("/");
        }
      } catch (error) {
        
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refrish]);
  let userData: usData = {
    _id:  userInfo?._id,
    email:userInfo?.email,
    username:userInfo?.username,
    name: userInfo?.name || "",
    bio: userInfo?.bio || "",
    image: "/preview.webp" || userInfo?.image,
    phone: userInfo?.phone,
  };
  return (
    <main className=" px-1 mx-auto py-12 flex flex-col max-w-3xl">
      <div className="px-10 fixed rounded-full lg:right-2  -right-4 top-10">
        {/* <SignOutbutton /> */}
      </div>
      <h1 className="font-bold text-[#000000]">Onboarding</h1>
      <p className=" text-gray-500 my-6">
        This is where you will be able to create a new account.
      </p>
      <div className="bg-gray-100  lg:p-10 p-2 ">
        <AccountProfile userData={userData} />
      </div>
    </main>
  );
};

export default Onboarding;
