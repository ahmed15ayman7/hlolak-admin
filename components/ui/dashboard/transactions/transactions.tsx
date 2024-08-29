"use client";
import Image from "next/image";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import styles from "./transactions.module.css";
import Link from "next/link";
import { IService, deleteService } from "@/lib/actions/service.actions";
import { setLoad } from "@/lib/redux/LoadSlice";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import EmployeeForm from "@/components/forms/assignEmployeeToService";
import { useState } from "react";
import { Checkbox } from "../../checkbox";

const Transactions = ({
  services,
  isDash,
  isWork,
  isTask,
}: {
  services: any[];
  isDash?: boolean;
  isWork?: boolean;
  isTask?: boolean;
}) => {
  const dispatch = useDispatch();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleSelectService = (serviceId: string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceId)
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      // Unselect all services
      setSelectedServices([]);
    } else {
      // Select all services
      const allServiceIds = services.map((service) => service._id);
      setSelectedServices(allServiceIds);
    }
    setSelectAll(!selectAll);
  };

  const handleFormCompletion = () => {
    setSelectedServices([]);
    setSelectAll(false);
  };

  const combinedEmployeesIn = selectedServices.flatMap((serviceId) => {
    const service = services.find((s) => s._id === serviceId);
    return service ? service.employee : [];
  });

  const combinedStates = selectedServices.map((serviceId) => {
    const service = services.find((s) => s._id === serviceId);
    return service ? service.state : "";
  });

  return (
    <div className={` ${styles.container} mt-3`}>
      <div className="flex justify-between">
        <h2 className={styles.title}>المحتسبات</h2>
        {(isDash || isWork) && (
          <Link href={isWork ? `/work/tasks/` : `/dashboard/services/`}>
            <button className={`${styles.button} ${styles.view}`}>
              المزيد
            </button>
          </Link>
        )}
      </div>
      <table className={styles.table}>
        <thead>

          <tr className="text-center">
           {!isTask && ( <td className="text-start">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </td>)}
            <td className="text-start">الاسم</td>
            <td>رقم الجوال</td>
            <td>الحاله</td>
            <td className="max-lg:hidden">تاريخ الانشاء</td>
            <td className="max-lg:hidden">جهة العمل</td>
            <td className="max-lg:hidden">نوع الخدمه</td>
            <td className="max-sm:hidden">لدى موظف</td>
            <td className="max-sm:hidden">الافاده</td>
            {selectedServices.length > 0 && (
              <td className="">
        <EmployeeForm
          serviceId={selectedServices}
          employeesIn={combinedEmployeesIn}
          state={combinedStates}
          onComplete={handleFormCompletion}
        />      
            </td>
      )}
          </tr>
        </thead>
        <tbody>
          {services.map((e: IService, i) => (
            <tr key={i} className="text-center">
             {!isTask && ( <td>
              {/* <Checkbox
                  checked={selectedServices.includes(e._id)}
                  onCheckedChange={() => handleSelectService(e._id)}
                /> */}
                <input
                  type="checkbox"
                  checked={selectedServices.includes(e._id)}
                  onChange={() => handleSelectService(e._id)}
                />
              </td>)}
              <td>
                <div className={styles.user}>
                  {e.name.split(" ").slice(0, 2).join(" ")}
                </div>
              </td>
              <td>{e.mobile}</td>
              <td>
                <div className="flex justify-center gap-2">
                  <p
                    className={`${styles.status} max-md:h-5 max-md:w-5  ${
                      e.state === "pending"
                        ? styles.pending
                        : e.state === "done"
                        ? styles.done
                        : e.state === "canceled"
                        ? styles.cancellede
                        : e.state === "created"
                        ? styles.created
                        : ""
                    }`}>
                    <span className="md:block hidden">
                      {translateState(e.state)}
                    </span>
                  </p>
                </div>
              </td>
              <td className="max-lg:hidden">
                {format(e.createdAt, "EEEE, d MMMM yyyy", { locale: ar })}
              </td>
              <td className="max-lg:hidden">
                {e.employer ? translateWorkField(e.employer) : "----"}
              </td>
              <td className="max-lg:hidden">
                {e.provided_service_type
                  ? translateServiceType(e.provided_service_type)
                  : "----"}
              </td>
              <td className="max-sm:hidden">
                {((e.employee && e.employee.length > 0) || e.employeeExl) &&
                e.state !== "done" &&
                e.state !== "canceled"
                  ? "نعم"
                  : "لا"}
              </td>
              <td className="max-sm:hidden">
                <div className="flex flex-col gap-1">
                  {e.notes.map((note, i) => (
                    <div className="flex justify-between gap-2" key={i}>
                      <p
                        className={`${styles.status} max-md:h-5 max-md:w-5 ${
                          note.state === "pending"
                            ? styles.pending
                            : note.state === "done"
                            ? styles.done
                            : note.state === "canceled"
                            ? styles.cancellede
                            : note.state === "created"
                            ? styles.created
                            : ""
                        }`}>
                        <span className="md:block hidden">
                          {translateState(note.state)}
                        </span>
                      </p>
                      <p>{i + 1}</p>
                    </div>
                  ))}
                </div>
              </td>
              <td>
                <div className={styles.buttons}>
                  <Link
                    href={
                      isTask
                        ? `/work/tasks/${e._id}`
                        : `/dashboard/services/${e._id}`
                    }>
                    <button className={`${styles.button} ${styles.view}`}>
                      <span className="md:block hidden">التفاصيل</span>
                      <span className="block md:hidden">
                        <MdOutlineDescription />
                      </span>
                    </button>
                  </Link>
                  {!isTask && (
                    <>
                      <button
                        className={`${styles.button} ${styles.delete}`}
                        onClick={async () => {
                          await deleteService(e._id);
                          dispatch(setLoad(Math.random()));
                        }}>
                        <span className="md:block hidden">حذف</span>
                        <span className="block md:hidden">
                          <MdDelete />
                        </span>
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  );
};

export default Transactions;

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
const translateState = (value: string) => {
  switch (value) {
    case "pending":
      return "جارية";
    case "canceled":
      return "رُفضت";
    case "done":
      return "تمت";
    case "created":
      return "جديد";
    default:
      return value;
  }
};
