"use client";
import Pagination from "@/components/ui/dashboard/pagination/pagination";
import Search from "@/components/ui/dashboard/search/search";
import styles from "@/components/ui/dashboard/users/users.module.css";
import Link from "next/link";
import { getUserByRedux } from "@/lib/redux/dispatch";
import {
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { selectUser } from "@/lib/redux/userSlice";
import { fetchAllServices } from "@/lib/actions/service.actions";
import { useSelector } from "react-redux";
import Transactions from "@/components/ui/dashboard/transactions/transactions";
import CardsTot from "@/constant/data";
const ServicesPage = ({
  searchParams,
}: {
  searchParams: { q: string; page: string };
}) => {
  let [services, setServices] = useState<any[]>();
  let [created, setcreated] = useState<any[]>([]);
  let [done, setdone] = useState<any[]>([]);
  let [canceled, setcanceled] = useState<any[]>([]);
  let [pending, setpending] = useState<any[]>([]);
  let [count, setCount] = useState<number>();
  let [type, setType] = useState<string>("created");
  const q = searchParams.q || "";
  const page = searchParams.page || "1";
  const user = useSelector(selectUser);
  let path = usePathname();
  let router = useRouter();
  useEffect(() => {
    type === "created"
      ? setServices(created)
      : type === "done"
      ? setServices(done)
      : type === "canceled"
      ? setServices(canceled)
      : type === "pending"
      ? setServices(pending)
      : setServices(created);
  }, [type,q,page]);
  useEffect(() => {
    getUserByRedux(router, path, user);
    let getAllServices = async () => {
      try {
        const services = await fetchAllServices({
          searchString: q,
          pageNum: +page,
          pageSize: 4,
        });
        setCount(services?.count);
        setServices(services?.services);
        let created1: SetStateAction<any[]> = [];
        let done1: SetStateAction<any[]> = [];
        let canceled1: SetStateAction<any[]> = [];
        let pending1: SetStateAction<any[]> = [];
        services?.services.forEach((service) =>
          service.state === "created"
            ? created1.push(service)
            : service.state === "done"
            ? done1.push(service)
            : service.state === "pending"
            ? pending1.push(service)
            : service.state === "canceled"
            ? canceled1.push(service)
            : null
        );
        setcreated(created1);
        setdone(done1);
        setpending(pending1);
        setcanceled(canceled1);
      } catch (e) {
        console.log(e);
      }
    };
    getAllServices();
  }, [q,page]);
  console.log(q)
  return (
    <div className="p-5">
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
          {/* <Search placeholder="Search for a service..." /> */}
          <p></p>
          <Link href="/dashboard/users/add">
            <button className={styles.addButton}>Add New</button>
          </Link>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.side}>{/* <Rightbar /> */}</div>{" "}
        </div>
      </div>
      {services && <Transactions services={services!} />}
      {count && <Pagination count={count} />}
    </div>
  );
};

export default ServicesPage;
