import Navbar from "@/components/ui/dashboard/navbar/navbar"
import Sidebar from "@/components/ui/dashboard/sidebar/sidebar"
import styles from "@/components/ui/dashboard/dashboard.module.css"
import Footer from "@/components/ui/dashboard/footer/footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className={styles.body}  >

    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar/>
      </div>
      <div className={styles.content}>
        <Navbar/>
        {children}
        <Footer/>
      </div>
    </div>
      </body>
      </html>
  )
}
