"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUser } from "@/lib/redux/userSlice";
import { setLoad } from "@/lib/redux/LoadSlice";
import { pusherClient } from "@/lib/pusher";
import { useEffect } from "react";
import styles from "../sidebar/sidebar.module.css";
import { menuItems1, menuItems2 } from "../sidebar/sidebar";
import CustomToast from "@/components/cards/CustomToast/CustomToast";
import { toast } from "react-toastify";
import MenuLink from "../sidebar/menuLink/menuLink";
const Header = ({ type }: { type: string }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const showNotification = (msg: any) => {
    toast(<CustomToast content={msg.content} link={`https://hlolak-admin.vercel.app${msg.link}`} name={msg.name} />)
    if (Notification.permission === "granted") {
      const notification = new Notification(`New message from ${msg.name}`, {
        body: msg.content,
        icon: msg.image,
      });
      dispatch(setLoad(Math.random()));
      notification.onclick = () => {
        if (msg.link) {
          window.location.href = `https://hlolak-admin.vercel.app${msg.link}`;
          window.focus();
        }
      };
    }
  };

  useEffect(() => {
    if (type === "admin") {
      const subscribedChannel = pusherClient.subscribe("AdminChannel");
      subscribedChannel.bind("admin", (msg: any) => {
        showNotification(msg);
      });
      return () => {
        pusherClient.unsubscribe("AdminChannel");
      };
    } else {
      const subscribedChannel = pusherClient.subscribe("services");
      subscribedChannel.bind(user?._id, (msg: any) => {
        showNotification(msg);
      });
      return () => {
        pusherClient.unsubscribe("services");
      };
    }
  }, []);

  useEffect(() => {
    if (
      Notification.permission !== "granted" &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      });
    }
  }, []);
  let menuItems = type === "admin" ? menuItems1 : menuItems2;
  return (
    <div className="fixed top-0 left-0 right-0 bg-[#182237] text-white flex justify-between items-center p-4 md:hidden">
      <span className="font-bold">{type === "admin"?"المشرف":"الموظف"}</span>
      <ul className={`${styles.list} flex `}>
          {menuItems.map((cat) => (
            <li key={cat.title}>
              <div className="flex gap-5">
              {cat.list.map((item) => (
                <MenuLink item={item} key={item.title} />
              ))}
              </div>
            </li>
          ))}
        </ul>
      <div className="flex items-center gap-4 cursor-pointer ">
        <Image
          src="/assets/logout.svg"
          alt="logout"
          width={24}
          height={24}
          onClick={() => {
            router.replace("/sign-in");
            dispatch(clearUser());
          }}
        />
        {/* <span className="hover:text-red-500 cursor-pointer">
          تسجيل الخروج
        </span> */}
      </div>
    </div>
  );
};

export default Header;