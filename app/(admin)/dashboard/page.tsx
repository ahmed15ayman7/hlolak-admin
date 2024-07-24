import CardsTot from "@/constant/data";
import Chart from "@/components/ui/dashboard/chart/chart";
import styles from "@/components/ui/dashboard/dashboard.module.css";
import Rightbar from "@/components/ui/dashboard/rightbar/rightbar";
import Transactions from "@/components/ui/dashboard/transactions/transactions";
import getData, { fetchAllServices, getAllServices } from "@/lib/actions/service.actions";
import { fetchAllUser } from "@/lib/actions/user.actions";
const Dashboard = async() => {
  let services= await fetchAllServices({searchString:'',pageNum:1,pageSize:5})
  let data= await getData()
  let top5User=await fetchAllUser({searchString:'',pageNum:1,pageSize:5})
  console.log(top5User)
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          
            {/* <CardsTot setType={setType} services={servicesCount?servicesCount:0}  /> */}
          
        </div>
        <Transactions services={services?.services!} isDash />
        <Chart data={data} />
      </div>
      <div className={styles.side}>
        <Rightbar
         topEmpp={top5User?.users!}
          />
      </div>
    </div>
  );
};
export const dynamic = "force-dynamic";
export default Dashboard;
