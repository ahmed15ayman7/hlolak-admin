"use client";
import { getUserByRedux } from "@/lib/redux/dispatch";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { selectUser } from "@/lib/redux/userSlice";
import { IService, getService, updateServiceState } from "@/lib/actions/service.actions";
import { useSelector } from "react-redux";
import styles from "@/components/ui/dashboard/transactions/transactions.module.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/components/shared/Loader";
const ServicesPage = ({ params }: { params: { id: string } }) => {
  let [service, setServices] = useState<IService>();
  let [note, setNote] = useState<string>("");
  let [loading, setLoading] = useState(true);
  const id = params.id;

  const user = useSelector(selectUser);
  let path = usePathname();
  let router = useRouter();
  const translateWorkField = (value: string) => {
    switch (value) {
      case "private_sector":
        return "قطاع خاص";
      case "retired":
        return "متقاعد";
      case "civilian":
        return "مدني";
      case "military":
        return "عسكري";
      default:
        return value;
    }
  };

  const translateServiceType = (value: string) => {
    switch (value) {
      case "purchase":
        return "شراء";
      case "mortgage":
        return "رهن";
      case "self_construction":
        return "بناء ذاتي";
      case "co_applicant":
        return "تضامن";
      default:
        return value;
    }
  };
  useEffect(() => {
    getUserByRedux(router, path, user,setLoading);
    let getAllServices = async () => {
      try {
        let service: IService | null | undefined = await getService(id);
        setServices(service!);
      } catch (e) {
        console.log(e);
      }
    };
    getAllServices();
  }, []);
  const onsubmit = async (data: "pending" | "canceled" | "done") => {
    try {
     let services:IService|null|undefined= await updateServiceState(service?._id!,data,user.name,service?.name!,note)
     setServices(services!)
     setNote("")
    } catch (error) {
      console.error(error);
    }
  };
  return service ? (
    <div
      className="container mx-auto p-6  shadow-md rounded-lg"
      style={{ direction: "rtl" }}>
        {loading&&<Loader is/>}
      <h1 className="text-3xl text-center font-extrabold text-white mb-20">
        {service.name}
      </h1>
      <div className="mb-6 grid  grid-cols-1 md:grid-cols-2 gap-20">
        <p className="text-lg text-center text-gray-300">
          <strong className="text-white px-2">رقم الجوال:</strong> {service.mobile}
        </p>
        <p className="text-lg text-center text-gray-300">
          <strong className="text-white px-2">جهة العمل:</strong>{" "}
          {translateWorkField(service.employer)}
        </p>
        <p className="text-lg text-center text-gray-300">
          <strong className="text-white px-2">المرتب:</strong> {service.salary}
        </p>
        <p className="text-lg text-center text-gray-300">
          <strong className="text-white px-2">نوع الخدمه:</strong>{" "}
          {translateServiceType(service.provided_service_type)}
        </p>
        <p className="text-lg text-center text-gray-300">
          <strong className="text-white px-2">
        هل يوجد عليه التزامات أو ديون؟:
          </strong>{"     "} {service.has_debts==="yes"?"نعم":"لا"}
        </p>
        <p className="text-lg text-center text-gray-300 px-2">
          <strong className="text-white">الحاله:</strong>
          <span
            className={`${styles.status} ${
              service.state === "pending"
                ? styles.pending
                : service.state === "done"
                ? styles.done
                : service.state === "canceled"
                ? styles.cancellede
                : service.state === "created"
                ? styles.created
                : ""
            }`}>
            {service.state}
          </span>
        </p>
      </div>
      <div className="w-full px-48">
        <Label htmlFor="note">اضافة ملاحظة</Label>
            <Input id="note"  className="w-full text-[#000000]" onChange={e=>setNote(e.target.value)} value={note} />
      </div>
      <div className="mb-6 flex flex-col md:flex-row items-start justify-center md:items-center mt-5  gap-20">
        <Button type="submit" className={`  ${styles.done} `}
        onClick={()=>onsubmit("done")}
        >
          Done
        </Button>
        <Button type="submit" className={`  ${styles.cancellede} `}
          onClick={()=>onsubmit("canceled")}
          >
          Reject
        </Button>
        <Button type="submit" className={`  ${styles.pending} `}
          onClick={()=>onsubmit("pending")}
        >
          Pending
        </Button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ServicesPage;
