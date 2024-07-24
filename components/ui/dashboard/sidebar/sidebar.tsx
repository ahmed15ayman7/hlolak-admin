'use client'
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import { useRouter } from "next/navigation";
import { clearUser } from "@/lib/redux/userSlice";
import { useDispatch } from 'react-redux';

import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
  MdImageSearch,
} from "react-icons/md";
import {IoIosImages } from "react-icons/io";
import {FaMicroblog } from "react-icons/fa";
export const menuItems1 = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Employees",
        path: "/dashboard/users",
        icon: <MdPeople />,
      },
      {
        title: "Services",
        path: "/dashboard/services",
        icon: <MdShoppingBag />,
      },
    ],
  },
  {
    title: "Data",
    list: [
      {
        title: "Offers",
        path: "/dashboard/offers",
        icon: <MdAttachMoney />,
      },
      {
        title: "Blogs",
        path: "/dashboard/blogs",
        icon: <MdWork />,
      },
      {
        title: "Gallery",
        path: "/dashboard/gallery",
        icon: <IoIosImages />,
      },
      {
        title: "Opinions",
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
    title: "Pages",
    list: [
      {
        title: "Work",
        path: "/work",
        icon: <MdDashboard />,
      },
      {
        title: "tasks",
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

const Sidebar = ({type}:{type:string}) => {

let menuItems= type==="admin" ? menuItems1:menuItems2
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className={`${styles.container}  flex flex-col justify-between`}>
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
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
</div>
        <div className="fixed bottom-10">
              <div className="flex gap-4 cursor-pointer " onClick={e=>{
                router.replace("/sign-in")
                dispatch(clearUser());
              }}>
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
                <span className=" text-[#fff] hover:text-[#ed143d]  max-lg:hidden">logout</span>
              </div>
            </div>
    </div>
  );
};

export default Sidebar;
