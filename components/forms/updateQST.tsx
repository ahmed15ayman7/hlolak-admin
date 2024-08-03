import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEdit, FiCheck, FiPlus } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { UpdateService } from "@/lib/actions/service.actions";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
const schema = z.object({
  description: z.string().min(1, { message: "الوصف مطلوب" }),
  totalDebt: z.number().min(0, { message: "يجب أن يكون إجمالي المديونية رقمًا موجبًا" }),
  debtInstallment: z.number().min(0, { message: "يجب أن يكون قسط المديونية رقمًا موجبًا" }),
});
const UpdateQST = ({ id,allData,setLoading }: { id: string ,setLoading:any,allData:{ id: number; description: string; totalDebt: string; debtInstallment: string }[]}) => {
  const [data, setData] = useState<{ id: number; description: string; totalDebt: string; debtInstallment: string }[]>(allData?allData:[]);
  const [editIdx, setEditIdx] = useState(-1);
  const [rowData, setRowData] = useState({
    description: "",
    totalDebt: "",
    debtInstallment: "",
  });

  const { control, handleSubmit, reset,getValues } = useForm({
    resolver: zodResolver(schema),
    defaultValues: rowData,
  });

  const handleEdit = (idx: number) => {
    if (data.length > 0) {
      setEditIdx(idx);
      setRowData({ ...data[idx] });
      reset(data[idx]);
    }
  };

  const handleSave = async (idx: number, formData: any) => {
    setLoading(true)
    const loadingToastId = toast.loading("Uploading file, please wait...");
    try {
      const updatedData = [...data];
      if (updatedData.length > 0) {
        updatedData[idx] = formData;
        setData(updatedData);
        setEditIdx(-1);
       let data2= await UpdateService({ serviceId: id, debtInstallments: updatedData });
       data2&& setData(data2.debtInstallments);
        setLoading(false)
        toast.update(loadingToastId, {
          render: "File uploaded successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }

    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const handleCancel = () => {
    setEditIdx(-1);
    reset({
      description: "",
      totalDebt: "",
      debtInstallment: "",
    });
  };

  const handleAddRow = () => {
    const newRow = {
      id: data.length + 1,
      description: "",
      totalDebt: "",
      debtInstallment: "",
    };
    setData([...data, newRow]);
    setEditIdx(data.length);
    reset(newRow);
  };

  return (
    <div className="container mx-auto my-5">
      <button
        className="mb-2 px-4 py-2 bg-[#5d57c9] hover:bg-[#5d57c9]/80 text-white rounded-md flex items-center"
        onClick={handleAddRow}
      >
        <FiPlus className="mr-2" />
        اضافة قسط
      </button>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">قسط المديونية</th>
            <th className="border border-gray-300 px-4 py-2">اجمالي المديونية</th>
            <th className="border border-gray-300 px-4 py-2">بيان</th>
            <th className="border border-gray-300 px-4 py-2">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.id}>
              <td className="border border-gray-300 px-4 py-2">
                {editIdx === idx ? (
                  <Controller
                    name="debtInstallment"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="text" className={`border rounded-md px-2 py-1 text-[#000000] ${getValues().debtInstallment.length>0?"":"border-[#f00] text-[#f00]"}`} />
                    )}
                  />
                ) : (
                  row.debtInstallment
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editIdx === idx ? (
                  <Controller
                    name="totalDebt"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="text" className={`border rounded-md px-2 py-1 text-[#000000] ${getValues().totalDebt.length>0?"":"border-[#f00] text-[#f00]"}`} />
                    )}
                  />
                ) : (
                  row.totalDebt
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editIdx === idx ? (
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} className={`border rounded-md px-2 py-1 text-[#000000] ${getValues().description.length>0?"":"border-[#f00] text-[#f00]"}`} />
                    )}
                  />
                ) : (
                  row.description
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editIdx === idx ? (
                  <div className="flex gap-3 justify-center">
                    <Button
                      className="px-4 py-2 bg-[#5d57c9] hover:bg-[#5d57c9]/80 text-white rounded-md flex items-center"
                      onClick={()=>{
                        getValues().debtInstallment.length>0&&
                        getValues().totalDebt.length>0&&
                        getValues().description.length>0&&
                         handleSave(idx, getValues())}}
                    >
                      <FiCheck className="mr-2" />
                      حفظ
                    </Button>
                    <Button
                      className="ml-2 px-4 py-2 bg-red-500/80 hover:bg-red-500/60 text-white rounded-md flex items-center"
                      onClick={handleCancel}
                    >
                      <MdOutlineCancel className="mr-2" />
                      الغاء
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="px-4 py-2 bg-yellow-500/80 hover:bg-yellow-500/60 text-white rounded-md flex items-center"
                    onClick={() => handleEdit(idx)}
                  >
                    <FiEdit className="mr-2" />
                    تعديل
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateQST;
