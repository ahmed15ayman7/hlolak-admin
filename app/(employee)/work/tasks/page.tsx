"use client";
import Pagination from "@/components/ui/dashboard/pagination/pagination";
import Search from "@/components/ui/dashboard/search/search";
import styles from "@/components/ui/dashboard/users/users.module.css";
import { getUserByRedux } from "@/lib/redux/dispatch";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { selectUser } from "@/lib/redux/userSlice";
import { useSelector } from "react-redux";
import Transactions from "@/components/ui/dashboard/transactions/transactions";
import { UserData, fetchUserAndService } from "@/lib/actions/user.actions";
import Loader from "@/components/shared/Loader";
import CardsTot from "@/constant/data";
const UsersPage = ({
  searchParams,
}: {
  searchParams: { q: string; page: string };
}) => {
  let [employee, setEmployee] = useState<UserData>();
  let [loading, setLoading] = useState(true);
  const q = searchParams?.q || "";
  let [type, setType] = useState<string>("normal");
  const page = searchParams?.page || 1;
  const user = useSelector(selectUser);
  let path = usePathname();
  let router = useRouter();
  useEffect(() => {
    getUserByRedux(router, path, user, setLoading);
    let getUsers = async () => {
      let employee = await fetchUserAndService(user?._id);

      setEmployee(employee!);
    };
    getUsers();
    // console.log(user);
  }, [q]);
  const created =
    employee?.services.filter((service) => service.state === "created") || [];
  const done =
    employee?.services.filter((service) => service.state === "done") || [];
  const canceled =
    employee?.services.filter((service) => service.state === "canceled") || [];
  const pending =
    employee?.services.filter((service) => service.state === "pending") || [];
  let services =q.length>0?employee?.services.filter((service) => service.mobile.includes(q)) || []:
    type === "created"
      ? created
      : type === "done"
      ? [...done, ...canceled]
      : type === "pending"
      ? pending
      : employee?.services;
  return (
    <div>
      {loading && <Loader is />}

      <div className={styles.main}>
        <div className={styles.cards}>
          <CardsTot
            created={created.length}
            done={done.length}
            canceled={canceled.length}
            pending={pending.length}
            type={type}
            setType={setType}
            />
        </div>
      </div>
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="رقم الجوال" />
      </div>
      {services && (
        <Transactions
        services={
          services
          ?
          .slice((+page - 1) * 5, +page * 5)!
        }
        isTask
        />
      )}
      <Pagination count={services?.length!} />
    </div>
      </div>
  );
};

export default UsersPage;
