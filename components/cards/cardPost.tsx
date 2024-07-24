import Link from "next/link";
import React from "react";
import { MdDelete } from "react-icons/md";
import styles from "../ui/dashboard/transactions/transactions.module.css";
import { useDispatch } from "react-redux";
import { setLoad } from "@/lib/redux/LoadSlice";
const CardPost = ({
  id,
  title,
  img,
  link,
  disc,
  time,
  deleteFunc,
}: {
  deleteFunc: any;
  id: string;
  title: string;
  img?: string;
  disc?: string;
  link: string;
  time: string;
}) => {
  const dispatch = useDispatch();
  return (
    <div
      className="p-4 py-8 max-sm:p-2 max-sm:py-4 relative md:mb-0 mb-6 flex flex-col justify-center items-center "
      style={{ direction: "rtl" }}>
      <div className=" absolute bottom-3 left-0 p-4">
        <button
          className={`${styles.button} ${styles.delete}`}
          onClick={async () => {
            await deleteFunc(id);
            dispatch(setLoad(Math.random()));
          }}>
          <MdDelete color="#ffffff" />
        </button>
      </div>
      <Link className="w-full" href={link}>
        {img && (
          <div
            className={`bg-gray-300 h-56  w-full rounded-lg shadow-md bg-cover bg-center`}
            style={{ backgroundImage: `url(${img})` }}
            data-aos="fade-up-right"></div>
        )}
        {disc && (
          <p
            className={`flex items-center justify-center bg-gray-200 h-56 w-full rounded-lg shadow-md bg-cover bg-center text-center`}>
            {disc}
          </p>
        )}
        <div
          className={` w-full bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5`}
          data-aos="fade-up-left">
          <h4 className="font-medium text-start" style={{ direction: "rtl" }}>
            {title}
          </h4>
          <div className="summary-post text-base text-justify">
            <time
              dateTime="2024-05-25T15:00:52Z"
              data-local="time"
              data-format="%Y/%m/%d">
              {time}
            </time>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardPost;
