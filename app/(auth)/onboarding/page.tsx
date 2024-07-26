"use client"
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import AccountProfile from "../../../components/forms/AccountProfile";
// import React from "react";
// import { fetchUser } from '@/lib/actions/user.actions';
// import { selectUser } from '@/lib/redux/userSlice';
// import { useSelector } from 'react-redux';
// interface usData {
//   _id: string | undefined;
//   email: string | undefined;
//   username: string | null | undefined;
//   name: string;
//   bio: string;
//   image: string | undefined;
//   phone: string| undefined;
// }
const Onboarding =  () => {
//   const [userInfo, setUserInfo] = useState<any>(null);
//   const [refrish, setrefrish] = useState<any>(null);
//   let navigate =useRouter()
//   const user = useSelector(selectUser);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//       if(!user) navigate.replace("/sign-in")
//         console.log(user?.email)
//         if(user?.email!==undefined){
//           const userInfo = JSON.parse(`${await fetchUser(user?._id)}`);
//           setUserInfo(userInfo)
//           if (userInfo?.onboarding) navigate.replace("/");
//         }
//       } catch (error) {
        
//         console.log("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [refrish]);
//   let userData: usData = {
//     _id:  userInfo?._id,
//     email:userInfo?.email,
//     username:userInfo?.username,
//     name: userInfo?.name || "",
//     bio: userInfo?.bio || "",
//     image: "/preview.webp" || userInfo?.image,
//     phone: userInfo?.phone,
//   };
  return (<></>
    // <main className=" px-1 mx-auto py-12 flex flex-col max-w-3xl">
    //   <div className="px-10 fixed rounded-full lg:right-2  -right-4 top-10">
    //     {/* <SignOutbutton /> */}
    //   </div>
    //   <h1 className="font-bold text-[#ffffff]">Onboarding</h1>
    //   <p className=" text-gray-200 my-6">
    //     This is where you will be able to create a new account.
    //   </p>
    //   <div className="bg-gray-100  lg:p-10 p-2 ">
    //     <AccountProfile userData={userData} />
    //   </div>
    // </main>
  );
};

export default Onboarding;
