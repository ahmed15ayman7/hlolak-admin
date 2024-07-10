"use client"
import Pagination from "@/components/ui/dashboard/pagination/pagination";
import Search from "@/components/ui/dashboard/search/search";
import styles from "@/components/ui/dashboard/users/users.module.css";
import { deleteUser, fetchUsers } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
import { getUserByRedux } from "@/lib/redux/dispatch";
import { useEffect,useState } from "react";
import { useRouter,usePathname } from "next/navigation";
import { selectUser } from "@/lib/redux/userSlice";
import { fetchAllUser } from "@/lib/actions/user.actions";
import {  useSelector } from "react-redux";
const UsersPage =  ({ searchParams }:{searchParams:{q:string,page:string}}) => {
  let [users,setUsers] =useState<any[]>();
  let [count,setCount] =useState<number>();
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const user = useSelector(selectUser);
  let path= usePathname()
  let router = useRouter();
  useEffect(()=>{
    getUserByRedux(router,path,user)
    let getUsers=async()=>{
      const  users  = await fetchAllUser({searchString:q,pageNum:+page,userId:user._id,pageSize:20});
      setCount(users?.count)
      setUsers(users?.users)
    }
    getUsers();
    // console.log(user);
  },[])
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Type</td>
            <td>Status</td>
            <td>phone</td>
          </tr>
        </thead>
        <tbody>
          {users ?users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.updatedAt?.toString().slice(4, 16)}</td>
              <td>{user.type}</td>
              <td>{user.phone}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={(user.id)} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          )):<tr className="bg-[#00000050]">
            <td>
            </td>
            <td>
            </td>
            <td>
            </td>
            <td>
    No Result 
            </td>
            <td>
            </td>
            <td>
            </td>
    </tr>}
        </tbody>
      </table>
      {count &&<Pagination count={count} />}
    </div>
    
  );
};

export default UsersPage;
