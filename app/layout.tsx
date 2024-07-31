import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderRedux from "@/lib/redux/ProviderRedux";
import MiddelWare from "@/lib/redux/MiddelWare";
// import SocketComp from "@/lib/realtime/SocketComp";
import styles from "@/components/ui/dashboard/dashboard.module.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: {
    default: "HLOLAK-ADMIN | AUTH ",
    template: "%s - HLOLAK-ADMIN ",
  },
  description: "HLOLAK-ADMIN",
  openGraph: {
    // type: 'website',
    // url: 'https://www.sporton.website/',
    title: "HLOLAK-ADMIN | AUTH",
    description: "HLOLAK-ADMIN",
    // images: [
    //   {
    // url: 'https://www.sporton.website/logo.png',
    // alt: 'HR CHAT LOGO',
    //   },
    // ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body className={`${styles.body}` + " bg-[#151c2c] "} dir="rtl">
      <ProviderRedux>
        <MiddelWare/>
          <div className=" w-full ">
            {children}
            <ToastContainer />
            {/* <SocketComp/> */}
          </div>
      </ProviderRedux>
        </body>
    </html>
  );
}
