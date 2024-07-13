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
const UsersPage =  ({ searchParams }:{searchParams:{q:string,page:string}}) => {
  let [services,setServices] =useState<any[]>();
  let [count,setCount] =useState<number>();
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const user = useSelector(selectUser);
  let path= usePathname()
  let router = useRouter();
  useEffect(()=>{
    getUserByRedux(router,path,user)
    let getUsers=async()=>{
      const  services  = await fetchAllServices({searchString:q,pageNum:+page,pageSize:20});
      setCount(services?.count)
      setServices(services?.services)
    }
    getUsers();
    // console.log(user);
  },[])
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a service..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      {/* <Transactions services={services!}/> */}
      {count &&<Pagination count={count} />}
    </div>
    
  );
};

export default UsersPage;
