import CardsTot from "@/constant/data";
import Chart from "@/components/ui/dashboard/chart/chart";
import styles from "@/components/ui/dashboard/dashboard.module.css";
import Rightbar from "@/components/ui/dashboard/rightbar/rightbar";
import Transactions from "@/components/ui/dashboard/transactions/transactions";
import { fetchAllServices, getAllServices } from "@/lib/actions/service.actions";
const Dashboard = async() => {
  let servicesCount= await getAllServices()
  let services= await fetchAllServices({searchString:'',pageNum:1,pageSize:5})
  let done = services?.services.filter(service => service.state==="done")
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          
            <CardsTot services={servicesCount?servicesCount:0} done={done?.length!} />
          
        </div>
        <Transactions services={services?.services!}  />
        <Chart />
      </div>
      <div className={styles.side}>
        {/* <Rightbar /> */}
      </div>
    </div>
  );
};
export const dynamic = "force-dynamic";
export default Dashboard;
