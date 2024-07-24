"use server"
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
  newState: "pending" | "canceled" | "done",employeeName:string,serviceName:string
) => {
  try {
    await connectDB();

    const updatedService:IService|undefined|null = await Service.findByIdAndUpdate(
      serviceId,
      { state: newState },
      { new: true }
    ).lean();
    if (!updatedService) {
      console.error("Service not found");
    }
    let message={
      name:employeeName,
      content:`Serivice ${serviceName} is ${newState}`,
      image:"/noavatar.png",
      link:`/dashboard/services/${serviceId}`
    }
    pusherServer.trigger("AdminChannel","admin",message)
    return updatedService;
  } catch (error) {
    console.error(error);
    console.error("Failed to update service state");
  }
};
export const assignEmployeeToService = async ({
  serviceId,
  employeeId,
  path
}: AssignEmployeeParams) => {
  try {
    await connectDB();
    const service = await Service.findById(serviceId);
    if (!service) {
      console.error("Service not found!");
    }
    const employee = await User.findById(employeeId);
    await employee.services.push(serviceId);
    await service.employee.push(employeeId);
    await service.save();
    await employee.save();
    revalidatePath(path)
    // return service;
    let message={
      name:"Admin",
      content:"New Task",
      image:"/noavatar.png",
      link:`/work/tasks/${serviceId}`
    }
    pusherServer.trigger("services",employeeId,message)
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
        { username: { $regex: regex } },
        { state: { $regex: regex } },
        { provided_service_type: { $regex: regex } },
        { step: { $regex: regex } },
      ];
    }
    let services = await Service.find(query)
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
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
    const services = await Service.countDocuments();
    return services;
  } catch (err) {
    console.error(err);
    console.error("Failed to fetch services!");
  }
};
export const getService = async (id:string) => {
  try {
    connectDB();
    const services:IService|null = await Service.findById(id).populate({
      path:'employee',
      model:User,
      select:"_id name username"
    }).lean()
    return services;
  } catch (err) {
    console.error(err);
    console.error("Failed to fetch service!");
  }
};
export const deleteService = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { id } = Object.fromEntries(formData);

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
