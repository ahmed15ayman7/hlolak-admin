"use client"
import Image from "next/image";
import styles from "./transactions.module.css";
import Link from "next/link";
import { deleteService } from "@/lib/actions/service.actions";

const Transactions = ({services}:{services:any[]}) => {

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Services</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>created At</td>
            <td>Amount</td>
            <td>Service Type</td>
          </tr>
        </thead>
        <tbody>
          {services.map(e=>

          
          <tr key={e}>
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
              <span className={`${styles.status} ${e.state==="pending"? styles.pending:e.state==="done"?styles.done:e.state==="cancelled"?styles.cancellede:e.state==="created"?styles.created:''}`}>
                {e.state}
              </span>
            </td>
            <td>{e.createdAt?.toString().slice(4, 16)}</td>
            <td>{e.salary}</td>
            <td>{e.provided_service_type}</td>
            <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/services/${e.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteService}>
                    <input type="hidden" name="id" value={(e._id)} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
