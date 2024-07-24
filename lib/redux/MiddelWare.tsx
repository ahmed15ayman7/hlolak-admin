"use client";
import { getUserByRedux } from "@/lib/redux/dispatch";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { selectUser } from "@/lib/redux/userSlice";
import { useSelector } from "react-redux";
const MiddelWare = () => {
  let path = usePathname();
  let router = useRouter();
  const user = useSelector(selectUser);
  let [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    let getD = async () => {
      getUserByRedux(router, path, user,setLoading);
    };
    getD();
  }, []);
  useEffect(() => {}, []);
  return <div></div>;
};

export default MiddelWare;
