"use client";
import { getUserByRedux } from "@/lib/redux/dispatch";
import { SetStateAction, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { selectUser } from "@/lib/redux/userSlice";
import {
  IService,
  assignEmployeeToService,
  getService,
} from "@/lib/actions/service.actions";
import { useSelector } from "react-redux";
import styles from "@/components/ui/dashboard/transactions/transactions.module.css";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ADDEmpValidation } from "@/lib/validation";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { UserData, fetchAllUser } from "@/lib/actions/user.actions";
const ServicesPage = ({ params }: { params: { id: string } }) => {
  let [service, setServices] = useState<IService>();
  let [employees, setEmployees] = useState<UserData[]>();
  const id = params.id;
  let form = useForm<z.infer<typeof ADDEmpValidation>>({
    resolver: zodResolver(ADDEmpValidation),
    defaultValues: {
      _id: "",
    },
  });
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
    getUserByRedux(router, path, user);
    let getAllServices = async () => {
      try {
        let service: IService | null | undefined = await getService(id);

        setServices(service!);
        const users = await fetchAllUser({
          searchString: "employee",
          pageNum: 1,
          userId: user._id,
          pageSize: 20,
        });
        let Employees: SetStateAction<UserData[] | undefined> = [];
        users?.users.forEach((a) => {
          service?.employee.forEach((e) => {
            a._id !== e?._id ? Employees.push(a) : null;
          });
        });
        setEmployees(Employees);
      } catch (e) {
        console.log(e);
      }
    };
    getAllServices();
  }, []);
  const onsubmit = async (data: z.infer<typeof ADDEmpValidation>) => {
    try {
      await assignEmployeeToService({
        serviceId: id,
        employeeId: data._id,
        path: path,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return service ? (
    <div className="container mx-auto p-6  shadow-md rounded-lg">
      <h1 className="text-3xl font-extrabold text-white mb-6">
        {service.name}
      </h1>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <p className="text-lg text-gray-300">
          <strong className="text-white">Mobile:</strong> {service.mobile}
        </p>
        <p className="text-lg text-gray-300">
          <strong className="text-white">Employer:</strong>{" "}
          {translateWorkField(service.employer)}
        </p>
        <p className="text-lg text-gray-300">
          <strong className="text-white">Salary:</strong> {service.salary}
        </p>
        <p className="text-lg text-gray-300">
          <strong className="text-white">Service Type:</strong>{" "}
          {translateServiceType(service.provided_service_type)}
        </p>
        <p className="text-lg text-gray-300">
          <strong className="text-white">Has Debts:</strong> {service.has_debts}
        </p>
        <p className="text-lg text-gray-300">
          <strong className="text-white">State:</strong>{" "}
          <span
            className={`${styles.status} ${
              service.state === "pending"
                ? styles.pending
                : service.state === "done"
                ? styles.done
                : service.state === "cancelled"
                ? styles.cancellede
                : service.state === "created"
                ? styles.created
                : ""
            }`}>
            {service.state}
          </span>
        </p>
        <p className="text-lg text-gray-300">
          <strong className="text-white">Step:</strong>{" "}
          {service.step ? service.step : 1}
        </p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center">
        <Form {...form}>
          <form
            className="simple_form p-6 pt-0  w-full rounded overflow-scroll sm:shadow-2xl"
            onSubmit={form.handleSubmit(onsubmit)}>
            <h2 className="text-2xl font-bold text-white mb-4">Add Employee</h2>
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="_id"
                render={({ field }) => (
                  <FormItem className="grow">
                    <Select
                      name={field.name}
                      disabled={field.disabled}
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <SelectTrigger className="w-full bg-gray-700">
                        <SelectValue placeholder="  Select Employee " />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 text-white">
                        <SelectGroup>
                          <SelectLabel>{employees&&employees?.length>0 ?"Select Employee":"Not Avilable Employee"} </SelectLabel>
                          {employees?.map((employee, i) => (
                            <SelectItem
                              key={i}
                              value={employee._id}
                              className=" bg-gray-800 font-bold">
                              {employee.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={`  ${styles.addButton} `}>
                Add
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <h2 className="text-2xl font-bold text-white mb-4">Employees</h2>
      <ul className="space-y-2">
        {service.employee && service.employee.length > 0 ? (
          service.employee.map((empId, i) => (
            <li
              key={i}
              className="bg-gray-700 text-gray-300 flex justify-between items-center p-3 rounded shadow-sm">
              <p>{empId.name}</p>
              <Link href={`/dashboard/users/${empId._id}`}>
                <button className={`${styles.button} ${styles.view}`}>
                  View
                </button>
              </Link>
            </li>
          ))
        ) : (
          <li className="bg-gray-700 text-gray-300 p-3 rounded shadow-sm">
            no employee
          </li>
        )}
      </ul>
    </div>
  ) : (
    <></>
  );
};

export default ServicesPage;
