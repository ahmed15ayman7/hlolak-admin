"use client"
import Pagination from "@/components/ui/dashboard/pagination/pagination";
import Search from "@/components/ui/dashboard/search/search";
import styles from "@/components/ui/dashboard/users/users.module.css";
import Link from "next/link";
import { getUserByRedux } from "@/lib/redux/dispatch";
import { useEffect,useState } from "react";
import { useRouter,usePathname } from "next/navigation";
import { selectUser } from "@/lib/redux/userSlice";
import {  fetchAllServices } from "@/lib/actions/service.actions";
import {  useSelector } from "react-redux";
import Transactions from "@/components/ui/dashboard/transactions/transactions";
import { UserData, fetchUserAndService } from "@/lib/actions/user.actions";
const UsersPage =  ({ searchParams }:{searchParams:{q:string,page:string}}) => {
  let [employee,setEmployee] =useState<UserData>();
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const user = useSelector(selectUser);
  let path= usePathname()
  let router = useRouter();
  useEffect(()=>{
    getUserByRedux(router,path,user)
    let getUsers = async () => {
      let employee = await fetchUserAndService(user?._id);

      setEmployee(employee!);
    };
    getUsers();
    // console.log(user);
  },[])
  return (
    <div className={styles.container}>
      {/* <div className={styles.top}>
        <Search placeholder="Search for a service..." />
      </div> */}
      {employee?.services&&<Transactions services={employee?.services!} isTask />}
      <Pagination count={employee?.services.length!} />
    </div>
    
  );
};

export default UsersPage;
