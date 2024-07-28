"use server";
import { connectDB } from "@/mongoose";
import { FilterQuery, SortOrder } from "mongoose";
import Service from "../models/service.models";
import User from "../models/user.models";
import { revalidatePath } from "next/cache";
import { UserData } from "./user.actions";
import { pusherServer } from "../pusher";

export interface IService {
  _id: string;
  name: string;
  mobile: string;
  employer: string;
  salary: string;
  provided_service_type: string;
  has_debts: string;
  employee: UserData[];
  createdAt: Date;
  state: string;
  step: string;
  notes: {
    note: string;
    state:string;
    name: string;
  }[];
}
interface AddServiceParams {
  name: string;
  mobile: string;
  employer: string;
  salary: number;
  provided_service_type: string;
  has_debts: string;
}

interface AssignEmployeeParams {
  serviceId: string;
  employeeId: string;
  newState: string;
  path: string;
}

export const addService = async ({
  name,
  mobile,
  employer,
  salary,
  provided_service_type,
  has_debts,
}: AddServiceParams) => {
  try {
    await connectDB();

    const newService = new Service({
      name,
      mobile,
      employer,
      salary,
      provided_service_type,
      has_debts,
    });
    await newService.save();
    return newService;
  } catch (err) {
    console.error(err);
    console.error("Failed to create service!");
  }
};
export const updateServiceState = async (
  serviceId: string,
  newState: "pending" | "canceled" | "done",
  employeeName: string,
  serviceName: string,
  note: string,
  employeeId: string,
) => {
  try {
    await connectDB();
    let q =
      newState === "done" ? { state: newState, step: 2 } : { state: newState };
    const updatedService: IService | undefined | null =
      await Service.findByIdAndUpdate(serviceId, q, { new: true }).lean();
    const updatedService2 = await Service.findById(serviceId);
    if (!updatedService) {
      console.error("Service not found");
    }
    if (newState === "done" ) {
      let employee= await User.findById(employeeId)
      await employee.servicesDone.push(serviceId);
    }
    note.length > 0 && newState === "pending"&&
      (await updatedService2?.notes.push({ note: note, name: employeeName, state: newState}));
    note.length > 0 && (await updatedService2?.save());
    let message = {
      name: employeeName,
      content: `Serivice ${serviceName} is ${newState}`,
      image: "/noavatar.png",
      link: `/dashboard/services/${serviceId}`,
    };
    pusherServer.trigger("AdminChannel", "admin", message);
    return updatedService;
  } catch (error) {
    console.error(error);
    console.error("Failed to update service state");
  }
};
export const assignEmployeeToService = async ({
  serviceId,
  employeeId,
  newState,
  path,
}: AssignEmployeeParams) => {
  try {
    await connectDB();
    const service = await Service.findById(serviceId);
    if (!service) {
      console.error("Service not found!");
    }
    if(newState==="done"){
      await Service.findByIdAndUpdate(serviceId,{state:"pending"});
    }
    const employee = await User.findById(employeeId);
    await employee.services.push(serviceId);
    await service.employee.push(employeeId);
    await service.save();
    await employee.save();
    revalidatePath(path);
    // return service;
    let message = {
      name: "Admin",
      content: "New Task",
      image: "/noavatar.png",
      link: `/work/tasks/${serviceId}`,
    };
    pusherServer.trigger("services", employeeId, message);
  } catch (err) {
    console.error(err);
    console.error("Failed to assign employee to service!");
  }
};
export async function fetchAllServices({
  searchString = "",
  pageNum = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  searchString: string;
  pageNum: number;
  pageSize: number;
  sortBy?: SortOrder;
}) {
  try {
    connectDB();
    let skipAmount = (pageNum - 1) * pageSize;
    let regex = new RegExp(searchString, "i");
    let query: FilterQuery<typeof Service> = {};
    if (searchString.trim() !== "") {
      query.$or = [
        { name: { $regex: regex } },
        { mobile: { $regex: regex } },
      ];
    }
    let services = await Service.find(query)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .lean()
      .exec();

    const totalServices = await Service.countDocuments(query);
    let isNext = +totalServices > skipAmount + services.length;
    return { count: totalServices, services, isNext };
  } catch (error: any) {
    console.log(`not found All Services: ${error.message}`);
  }
}
export const getAllServices = async () => {
  try {
    connectDB();
    const services = await Service.find().lean();
    return services;
  } catch (err) {
    console.error(err);
    console.error("Failed to fetch services!");
  }
};
export const getService = async (id: string) => {
  try {
    connectDB();
    const services: IService | null = await Service.findById(id)
      .populate({
        path: "employee",
        model: User,
        select: "_id name username",
      })
      .lean();
    return services;
  } catch (err) {
    console.error(err);
    console.error("Failed to fetch service!");
  }
};
export const deleteService = async (id: string) => {
  try {
    connectDB();
    await Service.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/services");
};

// تأكد من أن لديك اتصال صحيح بقاعدة البيانات

const getData = async () => {
  try{
    connectDB();
    const services = await Service.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            state: "$state"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.month",
          states: {
            $push: {
              state: "$_id.state",
              count: "$count"
            }
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    const formattedData = services.map(service => {
      const data = { month: service._id, created: 0, done: 0, pending: 0, canceled: 0 };
      service.states.forEach((state: { state: string | number; count: any; }) => {
        //@ts-ignore
        data[state.state] = state.count;
      });
      return data;
    });
    return formattedData;
  }catch(e){
    console.error(e)
  }
    

};

export default getData;
