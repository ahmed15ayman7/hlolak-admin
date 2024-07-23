"use client";
import React, { useState } from "react";
import AddOpinianForm from "@/components/forms/AddOpinianForm";
import Test from "@/components/shared/test";
import { useSearchParams } from "next/navigation";

const Opinion = () => {
  const searchParams = useSearchParams();
  let isOpinan=searchParams.has("o","true")
  let [reload, setReload] = useState(0);
  let [add, setAdd] = useState(isOpinan);
  return (
    <div>
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
