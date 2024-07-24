"use client";
import Image from "next/image";
import styles from "./transactions.module.css";
import Link from "next/link";
import { deleteService } from "@/lib/actions/service.actions";
import { setLoad } from "@/lib/redux/LoadSlice";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";

const Transactions = ({
  services,
  isDash,
  isWork,
  isTask,
}: {
  services: any[];
  isDash?: boolean;
  isWork?: boolean;
  isTask?: boolean;
}) => {
  let dispatch = useDispatch();
  return (
    <div className={`${styles.container} mt-3`}>
      <div className="flex justify-between">
        <h2 className={styles.title}>Services</h2>
        {(isDash || isWork) && (
          <Link href={isWork ? `/work/tasks/` : `/dashboard/services/`}>
            <button className={`${styles.button} ${styles.view}`}>more</button>
          </Link>
        )}
      </div>
      <table className={styles.table}>
        <thead>
          <tr className="text-center">
            <td className="text-start">Name</td>
            <td>Status</td>
            <td>created At</td>
            <td>Amount</td>
            <td>Service Type</td>
            <td>Have employee</td>
          </tr>
        </thead>
        <tbody>
          {services.map((e, i) => (
            <tr key={i} className="text-center">
              <td>
                <div className={styles.user}>
                  <Image
                    src="/noavatar.png"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {e.name}
                </div>
              </td>
              <td>
                <span
                  className={`${styles.status} ${
                    e.state === "pending"
                      ? styles.pending
                      : e.state === "done"
                      ? styles.done
                      : e.state === "canceled"
                      ? styles.cancellede
                      : e.state === "created"
                      ? styles.created
                      : ""
                  }`}>
                  {e.state}
                </span>
              </td>
              <td>{e.createdAt?.toString().slice(4, 16)}</td>
              <td>{e.salary}</td>
              <td>{e.provided_service_type}</td>
              <td>{e.employee && e.employee.length > 0 ? "true" : "false"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link
                    href={
                      isTask
                        ? `/work/tasks/${e._id}`
                        : `/dashboard/services/${e._id}`
                    }>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  {!isTask && (
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={async () => {
                        await deleteService(e._id);
                        dispatch(setLoad(Math.random()));
                      }}>
                      delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
