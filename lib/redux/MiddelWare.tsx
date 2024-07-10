'use client'
import { getUserByRedux } from "@/lib/redux/dispatch";
import { useEffect } from "react";
import { useRouter,usePathname } from "next/navigation";
import { selectUser } from "@/lib/redux/userSlice";
import {  useSelector } from "react-redux";
const MiddelWare = () => {
    let path= usePathname()
    let router = useRouter();
    const user = useSelector(selectUser);
    useEffect(()=>{
      getUserByRedux(router,path,user)
    },[])
  return (
    <div>'</div>
  )
}

export default MiddelWare