"use client";
import React, { useEffect, useState } from "react";
import AddOpinianForm from "@/components/forms/AddOpinianForm";
import Test from "@/components/shared/test";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/shared/Loader";
import { getUserByRedux } from "@/lib/redux/dispatch";
import { useSelector } from "react-redux";
import { selectUser } from "@/lib/redux/userSlice";

const Opinion = () => {
  const searchParams = useSearchParams();
  let isOpinan=searchParams.has("o","true")
  let [reload, setReload] = useState(0);
  let [add, setAdd] = useState(isOpinan);
  const user = useSelector(selectUser);
  let path = usePathname();
  let router = useRouter();
  let [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getUserByRedux(router, path, user,setLoading);},[]);
    return (
      <div>
      {loading&&<Loader is/>}
      {add && (
        <div className="flex justify-center px-6">
          <div className="w-1/2 max-md:w-full">
            <AddOpinianForm setReload={setReload} />
          </div>
        </div>
      )}
      <Test reload={reload} setAdd={setAdd} isPage add={add} />
    </div>
  );
};
export default Opinion;
export const dynamic = "force-dynamic";
