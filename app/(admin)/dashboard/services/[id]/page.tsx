"use client";
import { getUserByRedux } from "@/lib/redux/dispatch";
import { SetStateAction, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { selectUser } from "@/lib/redux/userSlice";
import {
  IService,
  assignEmployeeToService,
  getService,
  UpdateService,
} from "@/lib/actions/service.actions";
import { useSelector } from "react-redux";
import styles from "@/components/ui/dashboard/transactions/transactions.module.css";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { MdOutlineCancel } from "react-icons/md";
import { UserData, fetchAllUser } from "@/lib/actions/user.actions";
import Loader from "@/components/shared/Loader";
import { setLoad, selectLoad } from "@/lib/redux/LoadSlice";
import { useDispatch } from "react-redux";
import UpdateQST from "@/components/forms/updateQST";
import {
  DataLableAndKeys,
  selectOptions,
  translateServiceType,
  translateState,
  translateWorkField,
} from "@/constant/services";
import { EditSchemaKeys, editSchema } from "@/lib/validations/servicesSchemas";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FiEdit, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";


const ServicesPage = ({ params }: { params: { id: string } }) => {
  let dispatch = useDispatch();
  let [service, setServices] = useState<IService>();
  let [employees, setEmployees] = useState<UserData[]>();
  const id = params.id;
  const [isEditing, setIsEditing] = useState(false);
  const editForm = useForm<z.infer<typeof editSchema>>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      mobile: service?.mobile || "",
      employer: service?.employer || "",
      salary: service?.salary || "",
      provided_service_type: service?.provided_service_type || "",
      has_debts: service?.has_debts || "",
      bank: service?.bank || "",
      stop: service?.stop || "",
      appointment_date: service?.appointment_date || "",
      id_number: service?.id_number || "",
      property_value: service?.property_value || "",
      property_status: service?.property_status || "",
      property_age: service?.property_age || "",
      net_salary: service?.net_salary || "",
      gross_salary: service?.gross_salary || "",
    },
  });

  const employeeForm = useForm<z.infer<typeof ADDEmpValidation>>({
    resolver: zodResolver(ADDEmpValidation),
  });

  const user = useSelector(selectUser);
  let path = usePathname();
  let router = useRouter();
  let [loading, setLoading] = useState<boolean>(true);
  const load = useSelector(selectLoad);
  let employes = service?.employeeExl
    ? [...service.employee, service.employeeExl]
    : service?.employee;

  useEffect(() => {
    getUserByRedux(router, path, user, setLoading);
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
        users?.users?.forEach((a) => {
          service?.employee && service?.employee.length > 0
            ? service?.employee.forEach((e) => {
                a._id === e?._id ? null : Employees.push(a);
              })
            : Employees.push(a);
        });
        setEmployees(Employees);
      } catch (e) {
        console.log(e);
      }
    };
    getAllServices();
  }, [load]);

  const onEmployeeSubmit: SubmitHandler<
    z.infer<typeof ADDEmpValidation>
  > = async (data) => {
    try {
      await assignEmployeeToService({
        serviceId: id,
        newState: service?.state!,
        employeeId: data._id,
        path: path,
      });
      dispatch(setLoad(Math.random()));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (data: z.infer<typeof editSchema>) => {
    setLoading(true);
    const loadingToastId = toast.loading("جاري تحديث البيانات...");
    try {
      let updatedService: IService | null | undefined = await UpdateService({
        serviceId: service?._id!,
        loan_amount: data.loan_amount,
        installment: data.installment,
        duration: data.duration,
        bank: data.bank,
        stop: data.stop,
        appointment_date: data.appointment_date,
        id_number: data.id_number,
        property_value: data.property_value,
        property_status: data.property_status,
        property_age: data.property_age,
        net_salary: data.net_salary,
        gross_salary: data.gross_salary,
        mobile: data.mobile,
        employer: data.employer,
        salary: data.salary,
        provided_service_type: data.provided_service_type,
        has_debts: data.has_debts,
      });
      setServices(updatedService!);
      toast.update(loadingToastId, {
        render: "نجح تحديث البيانات",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setLoading(false);
      dispatch(setLoad(Math.random()));
      editForm.reset({ ...updatedService });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return service ? (
    <div
      className="container mx-auto p-6 shadow-md rounded-lg"
      style={{ direction: "rtl" }}>
      {loading && <Loader is />}
      <div
        className={`mb-6 ${
          !isEditing ? " " : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        } gap-4`}>
        <h1 className="text-3xl font-extrabold text-center text-white mb-6">
          {service.name}
        </h1>
        {isEditing && (
          <p className="text-lg text-gray-300 px-2">
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
              {translateState(service.state)}
            </span>
          </p>
        )}
        {isEditing && (
          <p className="text-lg text-gray-300">
            <strong className="text-white text-center">المرحلة:</strong>{" "}
            {service.step ? service.step : 1}
          </p>
        )}
      </div>
      <div
        className={`mb-6 ${
          isEditing ? " " : ""
        } gap-4`}>
        {isEditing ? (
          <Form {...editForm}>
            <form
              className="simple_form p-6 pt-0 w-full rounded overflow-scroll sm:shadow-2xl"
              onSubmit={editForm.handleSubmit(handleSave)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {DataLableAndKeys.map((fieldItems, index) =>(
                  <FormField
                    key={index}
                    control={editForm.control}
                    name={fieldItems.key as EditSchemaKeys}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Label className="text-lg text-white">
                          {fieldItems.label}
                        </Label>
                        {fieldItems.key === "has_debts" ||
                        fieldItems.key === "stop" ? (
                          <RadioGroup
                            className="flex justify-end"
                            defaultValue={field.value}
                            onChange={field.onChange}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="yes" />
                              <Label htmlFor="yes">نعم</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="no" />
                              <Label htmlFor="no">لا</Label>
                            </div>
                          </RadioGroup>
                        ) : //@ts-ignore
                        selectOptions[fieldItems.key] ? (
                          renderSelect(field, fieldItems.key)
                        ) : (
                          <Input
                            {...field}
                            className="form-input mt-1 block w-full "
                          />
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <div className="flex justify-center gap-10 ">
                <Button type="submit" className={`${styles.addButton}`}>
                  <FiCheck className="mr-2" />
                  حفظ
                </Button>
                <Button
                  type="button"
                  className={`${styles.delete}`}
                  onClick={() => setIsEditing(false)}>
                  <MdOutlineCancel className="mr-2" />
                  الغاء
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DataLableAndKeys.map(
                (field, index) =>
                  //@ts-ignore
                  service[field.key] && (
                    <p
                      key={index}
                      className="text-lg text-center text-gray-300">
                      <strong className="text-white px-2">
                        {field.label}:
                      </strong>{" "}
                      {/* @ts-ignore */}
                      {service[field.key]==="yes"?"نعم":service[field.key]==="no"?"لا":field.key==="employer"?translateWorkField(service[field.key]):field.key==="provided_service_type"?translateServiceType(service[field.key]):service[field.key]}
                    </p>
                  )
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">

       
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
                {translateState(service.state)}
              </span>
            </p>
            <p className="text-lg text-center text-gray-300">
              <strong className="text-white text-center">المرحلة:</strong>{" "}
              {service.step ? service.step : 1}
            </p>
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  editForm.reset({
                    mobile: service?.mobile || "",
                    employer: service?.employer || "",
                    salary: service?.salary || "",
                    provided_service_type: service?.provided_service_type || "",
                    has_debts: service?.has_debts || "",
                    bank: service?.bank || "",
                    stop: service?.stop || "",
                    appointment_date: service?.appointment_date || "",
                    id_number: service?.id_number || "",
                    property_value: service?.property_value || "",
                    property_status: service?.property_status || "",
                    property_age: service?.property_age || "",
                    net_salary: service?.net_salary || "",
                    gross_salary: service?.gross_salary || "",
                  })
                  setIsEditing(true)
                }}
                className="px-4 py-2 bg-yellow-500/80 hover:bg-yellow-500/60 text-white rounded-md flex items-center">
                <FiEdit className="ml-2" />
                 تعديل / اضافة مبلغ تمويل
              </Button>
            </div>  
               </div>
          </>
        )}
      </div>
      <UpdateQST id={service._id} allData={service.debtInstallments} setLoading={setLoading} />
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center">
        <Form {...employeeForm}>
          <form
            className="simple_form p-6 pt-0 w-full rounded overflow-scroll sm:shadow-2xl"
            onSubmit={employeeForm.handleSubmit(onEmployeeSubmit)}>
            <h2 className="text-2xl font-bold text-white mb-4">اضافة موظف</h2>
            <div className="flex gap-3">
              <FormField
                control={employeeForm.control}
                name="_id"
                render={({ field }) => (
                  <FormItem className="grow">
                    <Select
                      name={field.name}
                      disabled={field.disabled}
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <SelectTrigger className="w-full bg-gray-700 text-white">
                        <SelectValue placeholder="اختر الموظف" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 text-white">
                        <SelectGroup>
                          <SelectLabel>
                            {employees && employees.length > 0
                              ? "اختر الموظف"
                              : "لا يوجد موظفين متاحين"}{" "}
                          </SelectLabel>
                          {employees?.map((employee, i) => (
                            <SelectItem
                              key={i}
                              value={employee._id}
                              className="bg-gray-800 font-bold">
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
              <Button type="submit" className={`${styles.addButton}`}>
                اضافة
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">الموظفين</h2>
      <ul className="space-y-2">
        {employes && employes.length > 0 ? (
          employes.map((empId, i) => (
            <li
              key={i}
              className="bg-gray-700 text-gray-300 flex justify-between items-center p-3 rounded shadow-sm">
              <p>{empId.name}</p>
              {empId._id && (
                <Link href={`/dashboard/users/${empId._id}`}>
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
              )}
            </li>
          ))
        ) : (
          <li className="bg-gray-700 text-gray-300 p-3 rounded shadow-sm">
            لم يتم اختيار موظف بعد
          </li>
        )}
      </ul>
      <h2 className="text-2xl font-bold text-white my-4">الملاحظات</h2>
      <ul className="space-y-2">
        {service.notes && service.notes.length > 0 ? (
          service.notes.map((note, i) => (
            <li
              key={i}
              className="bg-gray-700 text-gray-300 flex justify-between items-center p-3 rounded shadow-sm">
              <p>{note.note}</p>
              {note.state && (
                <p className="text-lg text-center text-gray-300 px-2">
                  <strong className="text-white">الحاله:</strong>
                  <span
                    className={`${styles.status} ${
                      note.state === "done"
                        ? styles.done
                        : note.state === "pending"
                        ? styles.pending
                        : note.state === "canceled"
                        ? styles.cancellede
                        : service.state === "created"
                        ? styles.created
                        : ""
                    }`}>
                    {translateState(note.state)}
                  </span>
                </p>
              )}
              <p>{note.name}</p>
            </li>
          ))
        ) : (
          <li className="bg-gray-700 text-gray-300 p-3 rounded shadow-sm">
            لا يوجد ملاحظات
          </li>
        )}
      </ul>
    </div>
  ) : (
    <></>
  );
};

export default ServicesPage;

const renderSelect = (field: any, key: string) => (
  <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
    <SelectTrigger className="w-full">
      <SelectValue
        placeholder={
          key === "provided_service_type" ? "نوع الخدمة المقدمة" : "جهة العمل"
        }
      />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>
          {key === "provided_service_type" ? "نوع الخدمة المقدمة" : "جهة العمل"}
        </SelectLabel>
        {
          //@ts-ignore
          selectOptions[key].map((option, i) => (
            <SelectItem
              key={i}
              value={option.value}
              className="bg-gray-800 font-bold">
              {option.label}
            </SelectItem>
          ))
        }
      </SelectGroup>
    </SelectContent>
  </Select>
);
