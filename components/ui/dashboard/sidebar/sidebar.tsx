"use client";
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import { useRouter } from "next/navigation";
import { clearUser, selectUser } from "@/lib/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLoad } from "@/lib/redux/LoadSlice";
import CustomToast from "@/components/cards/CustomToast/CustomToast";
import { toast } from "react-toastify";
import {
  MdDashboard,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdPeople,
} from "react-icons/md";
import { IoIosImages } from "react-icons/io";
import { FaMicroblog } from "react-icons/fa";
import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher";
export const menuItems1 = [
  {
    title: "الصفحات الاساسيه",
    list: [
      {
        title: "اللوحة",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "الموظفين",
        path: "/dashboard/users",
        icon: <MdPeople />,
      },
      {
        title: "المحتسبات",
        path: "/dashboard/services",
        icon: <MdShoppingBag />,
      },
    ],
  },
  {
    title: "البيانات الفرعيه",
    list: [
      {
        title: "العروض العقاريه",
        path: "/dashboard/offers",
        icon: <MdAttachMoney />,
      },
      {
        title: "المدونات",
        path: "/dashboard/blogs",
        icon: <MdWork />,
      },
      {
        title: "معرض الصور",
        path: "/dashboard/gallery",
        icon: <IoIosImages />,
      },
      {
        title: "الاراء",
        path: "/dashboard/opinions",
        icon: <FaMicroblog />,
      },
    ],
  },
  // {
  //   title: "User",
  //   list: [
  //     {
  //       title: "Settings",
  //       path: "/dashboard/settings",
  //       icon: <MdOutlineSettings />,
  //     },
  //     {
  //       title: "Help",
  //       path: "/dashboard/help",
  //       icon: <MdHelpCenter />,
  //     },
  //   ],
  // },
];
export const menuItems2 = [
  {
    title: "الصفحات الاساسيه",
    list: [
      {
        title: "اللوحه",
        path: "/work",
        icon: <MdDashboard />,
      },
      {
        title: "المحتسبات",
        path: "/work/tasks",
        icon: <MdShoppingBag />,
      },
    ],
  },
  // {
  //   title: "Analytics",
  //   list: [
  //     {
  //       title: "Revenue",
  //       path: "/work/revenue",
  //       icon: <MdWork />,
  //     },
  //     {
  //       title: "Reports",
  //       path: "/work/reports",
  //       icon: <MdAnalytics />,
  //     },
  //     {
  //       title: "Teams",
  //       path: "/work/teams",
  //       icon: <MdPeople />,
  //     },
  //   ],
  // },
  // {
  //   title: "User",
  //   list: [
  //     {
  //       title: "Settings",
  //       path: "/work/settings",
  //       icon: <MdOutlineSettings />,
  //     },
  //     {
  //       title: "Help",
  //       path: "/work/help",
  //       icon: <MdHelpCenter />,
  //     },
  //   ],
  // },
];

const Sidebar = ({ type }: { type: string }) => {
  const user = useSelector(selectUser);
const showNotification = (msg: any) => {
  toast(<CustomToast content={msg.content} link={`https://hlolak-admin.vercel.app${msg.link}`} name={msg.name} />)
  if (Notification.permission === "granted") {
    const notification = new Notification(
      `New message from ${msg.name}`,
      {
        body: msg.content,
        icon: msg.image,
      }
    );
    dispatch(setLoad(Math.random()));
    notification.onclick = () => {
      if(msg.link) {
        window.location.href =
        `https://hlolak-admin.vercel.app${msg.link}`;
        // `http://localhost:3000${msg.link}`;
        window.focus();
      } 
    };
  }
};
  useEffect(() => {
    if(type === "admin"){

      const subscribedChannel = pusherClient.subscribe("AdminChannel");
      subscribedChannel.bind("admin", (msg: any) => {
        // setMessages((prevMessages) => [...prevMessages, msg]);
        showNotification(msg);
      });
      return () => {
        pusherClient.unsubscribe("AdminChannel");
      };
    }else{
      const subscribedChannel = pusherClient.subscribe("services");
      subscribedChannel.bind(user?._id, (msg: any) => {
        // setMessages((prevMessages) => [...prevMessages, msg]);
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
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className={`${styles.container}  flex flex-col justify-between `}>
      <div className="">
        <div className={styles.user}>
          {/* <Image
          className={styles.userImage}
          src={user.img || "/noavatar.png"}
          alt=""
          width="50"
          height="50"
        /> */}
          <div className={styles.userDetail}>
            {/* <span className={styles.username}>{user.username}</span> */}
            <span className={styles.userTitle}>{type === "admin"?"المشرف":"الموظف"}</span>
          </div>
        </div>
        <ul className={styles.list}>
          {menuItems.map((cat) => (
            <li key={cat.title}>
              <span className={`${styles.cat} max-md:invisible`}>{cat.title}</span>
              {cat.list.map((item) => (
                <MenuLink item={item} key={item.title} />
              ))}
            </li>
          ))}
        </ul>
      </div>
      <div className="fixed bottom-10">
        <div
          className="flex gap-4 cursor-pointer "
          onClick={(e) => {
            router.replace("/sign-in");
            dispatch(clearUser());
          }}>
          <Image src="/assets/logout.svg" alt="logout" width={24} height={24} />
          <span className=" text-[#fff] hover:text-[#ed143d]  max-lg:hidden">
            تسجيل الخروج
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
