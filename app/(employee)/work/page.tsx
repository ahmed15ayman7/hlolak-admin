"use client";
import CardsTot from "@/constant/data";
import styles from "@/components/ui/dashboard/dashboard.module.css";
import Rightbar from "@/components/ui/dashboard/rightbar/rightbar";
import Transactions from "@/components/ui/dashboard/transactions/transactions";
import { UserData, fetchUserAndService } from "@/lib/actions/user.actions";
import { getUserByRedux } from "@/lib/redux/dispatch";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUser } from "@/lib/redux/userSlice";
import Loader from "@/components/shared/Loader";
const Dashboard = ({
  searchParams,
}: {
  searchParams: { q: string; page: string };
}) => {
  let [employee, setEmployee] = useState<UserData>();
  const page = searchParams?.page || 1;
  const user = useSelector(selectUser);
  let path = usePathname();
  let router = useRouter();
  let [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getUserByRedux(router, path, user, setLoading);
    let getUsers = async () => {
      let employee = await fetchUserAndService(user?._id);

      setEmployee(employee!);
    };
    getUsers();
  }, []);
  return (
    <div className={styles.wrapper}>
      {loading && <Loader is />}
      <div className={styles.main}>
        <div className={styles.cards}>
          {/* <CardsTot services={servicesCount?servicesCount:0}  /> */}
        </div>
        {employee?.services && (
          <Transactions
            services={employee?.services.slice(+page - 1, +page * 5)}
            isWork
            isTask
          />
        )}
      </div>
      {/* <div className={styles.side}><Rightbar /></div> */}
    </div>
  );
};
export const dynamic = "force-dynamic";
export default Dashboard;
