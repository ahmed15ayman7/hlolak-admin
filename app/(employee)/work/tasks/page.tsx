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
import UploadExcelForm from "@/components/forms/AddServicesExcel";
import Link from "next/link";

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
  }, [q]);

  // دالة لتصفية المهام اليومية
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const created =
    employee?.services.filter((service) => service.state === "created") || [];
  const done =
    employee?.services.filter((service) => service.state === "done") || [];
  const canceled =
    employee?.services.filter((service) => service.state === "canceled") || [];
  const pending =
    employee?.services.filter((service) => service.state === "pending") || [];
  const daily =
    employee?.services.filter((service) => isToday(new Date(service.createdAt))) || [];

  let services =
    q.length > 0
      ? employee?.services.filter((service) => service.mobile.includes(q)) || []
      : type === "created"
      ? created
      : type === "done"
      ? [...done, ...canceled]
      : type === "pending"
      ? pending
      : type === "daily"
      ? daily
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
            daily={daily.length?daily.length:0}
            type={type}
            setType={setType}
          />
        </div>
      </div>
      <div className={styles.container}>
      <div className={styles.top}>
          <Search placeholder="البحث برقم الجوال" />
          <p></p>
          <div className="flex gap-5">
          <UploadExcelForm/>
          <Link href="/work/tasks/add">
            <button className={styles.addButton}>اضافة</button>
          </Link>
          </div>
        </div>
        {services && (
          <Transactions
            services={services?.slice((+page - 1) * 5, +page * 5)!}
            isTask
          />
        )}
        <Pagination count={services?.length!} />
      </div>
    </div>
  );
};

export default UsersPage;
