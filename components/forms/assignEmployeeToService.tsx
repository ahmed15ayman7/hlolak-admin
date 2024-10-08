import React, { SetStateAction, useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectValue, SelectLabel } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoad, setLoad } from '@/lib/redux/LoadSlice';
import { assignEmployeeToService } from '@/lib/actions/service.actions';
import { usePathname } from 'next/navigation';
import { UserData, fetchAllUser } from '@/lib/actions/user.actions';
import { selectUser } from '@/lib/redux/userSlice';
import { toast } from "react-toastify";

const ADDEmpValidation = z.object({
  _id: z.string().nonempty("اختر الموظف"),
});

type FormValues = z.infer<typeof ADDEmpValidation>;

const EmployeeForm = ({ state, serviceId, employeesIn,onComplete }: { state: string[], serviceId: string[], employeesIn: { _id: string, name: string }[],onComplete:()=>void }) => {
  const dispatch = useDispatch();
  const load = useSelector(selectLoad);
  const [employees, setEmployees] = useState<UserData[]>([]);
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState<boolean>(true);
  
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(ADDEmpValidation),
  });

  const path = usePathname();

  const onEmployeeSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    const loadingToastId = toast.loading("جاري اضافة الموظف...");
    try {
      // Map over serviceId array and assign the employee to each service
      await Promise.all(serviceId.map(async (id,i) => {
        await assignEmployeeToService({
          serviceId: id, 
          newState: state[i],
          employeeId: data._id,
          path: path,
        });
      }));
      onComplete();
      toast.update(loadingToastId, {
        render: "تمت اضافة الموظف إلى جميع الخدمات",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setLoading(false);
      dispatch(setLoad(Math.random()));
    } catch (error) {
      console.error(error);
      toast.update(loadingToastId, {
        render: "حدث خطأ أثناء إضافة الموظف",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    const getAllEmployees = async () => {
      try {
        const users = await fetchAllUser({
          searchString: "employee",
          pageNum: 1,
          userId: user._id,
          pageSize: 20,
        });
        const availableEmployees = users?.users?.filter(a => 
          !employeesIn.some(e => e._id === a._id)
        );
        setEmployees(availableEmployees || []);
      } catch (e) {
        console.log(e);
      }
    };
    getAllEmployees();
  }, [load]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative inline-block text-left">
          <Button className="bg-[#5d57c9] text-white py-2 px-4 rounded hover:bg-[#5d57c9]/80">
            <FaPlus />
          </Button>
          <div className="tooltip absolute -right-72 border-2 border-[#5d57c9] top-1/2 transform -translate-x-1/2 -translate-y-1/2 ml-2 w-32 p-2 text-center text-black bg-white rounded opacity-0 transition-opacity duration-300 ease-in-out">
            اضافة موظف
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className={"bg-[#182237] py-20"}>
        <form
          className="p-6 pt-0 w-full rounded bg-[#182237] overflow-scroll sm:shadow-2xl"
          onSubmit={handleSubmit(onEmployeeSubmit)}
        >
          <h2 className="text-2xl font-bold text-white mb-4">اضافة موظف</h2>
          <div className="flex gap-3">
            <Controller
              name="_id"
              control={control}
              render={({ field }) => (
                <div className="grow">
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full bg-gray-700 text-white">
                      <SelectValue placeholder="اختر الموظف" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 text-white">
                      <SelectGroup>
                        <SelectLabel>
                          {employees.length > 0 ? "اختر الموظف" : "لا يوجد موظفين متاحين"}
                        </SelectLabel>
                        {employees.map((employee) => (
                          <SelectItem
                            key={employee._id}
                            value={employee._id}
                            className="bg-gray-800 font-bold"
                          >
                            {employee.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors._id && <p className="text-red-500">{errors._id.message}</p>}
                </div>
              )}
            />
            <Button type="submit" className="bg-[#5d57c9] hover:bg-[#5d57c9]/80 text-white">
              اضافة
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeForm;
