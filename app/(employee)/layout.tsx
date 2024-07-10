
import Navbar from "@/components/ui/dashboard/navbar/navbar";
import Sidebar from "@/components/ui/dashboard/sidebar/sidebar";
import styles from "@/components/ui/dashboard/dashboard.module.css";
import Footer from "@/components/ui/dashboard/footer/footer";
import "../globals.css";
import ProviderRedux from "@/lib/redux/ProviderRedux";
import type { Metadata } from "next";
import "../globals.css";
import MiddelWare from "@/lib/redux/MiddelWare";
export const metadata: Metadata = {
  title: "HLOLAK-WORK",
  description: "HLOLAK-WORK",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ProviderRedux>
        <body className={styles.body}>
        <MiddelWare/>
          <div className={styles.container}>
            <div className={styles.menu}>
              <Sidebar />
            </div>
            <div className={styles.content}>
              <Navbar />
              <div className={"min-h-[80vh]"}>{children}</div>
              <Footer />
            </div>
          </div>
        </body>
      </ProviderRedux>
    </html>
  );
}
