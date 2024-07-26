import Navbar from "@/components/ui/dashboard/navbar/navbar";
import Sidebar from "@/components/ui/dashboard/sidebar/sidebar";
import styles from "@/components/ui/dashboard/dashboard.module.css";
import Footer from "@/components/ui/dashboard/footer/footer";
import "../globals.css";
import ProviderRedux from "@/lib/redux/ProviderRedux";
import type { Metadata } from "next";
import MiddelWare from "@/lib/redux/MiddelWare";
export const metadata: Metadata = {
  title: "HLOLAK-ADMIN",
  description: "HLOLAK-ADMIN",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en">
        // <body className={styles.body}>
      //  <ProviderRedux> 
          <section className={` w-full ${styles.container}`}>
            <div className={styles.menu}>
              <Sidebar type={"admin"} />
            </div>
            <div className={styles.content}>
              {/* <Navbar /> */}
              <div className={"min-h-[80vh]"}>{children}</div>
              <Footer />
            </div>
        {/* <MiddelWare/> */}
          </section>
      // </ProviderRedux> 
        // {/* </body> */}
    // {/* </html> */}
  );
}
