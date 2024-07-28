"use client"
import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";


const Rightbar = ({topEmpp}:{topEmpp:any[]}) => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
        </div>
        <div className={styles.text}>
          <div className="flex justify-between gap-5" >
          <p className={styles.notification}>🔥 اول خمس موظفين</p>
          <p className={styles.notification}>عدد</p>
        </div>
          {topEmpp.map((e,i)=>
        e.type==="employee"&&
        <div className="flex justify-between" key={i}>
          <h3 className={styles.title}>
            {e.name}
          </h3>
          <p className={styles.desc}>
            {e.servicesDone.length?e.servicesDone.length:0}
          </p>
        </div>
        )}
          {/* <span className={styles.subtitle}>Takes 4 minutes to learn</span> */}
          <button className={styles.button}>
            <MdPlayCircleFilled />
            Show All
          </button>
        </div>
      </div>
      {/* <div className={styles.item}>
        <div className={styles.text}>
          <span className={styles.notification}>🚀 Coming Soon</span>
          <h3 className={styles.title}>
            New server actions are available, partial pre-rendering is coming
            up!
          </h3>
          <span className={styles.subtitle}>Boost your productivity</span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <button className={styles.button}>
            <MdReadMore />
            Learn
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Rightbar;
