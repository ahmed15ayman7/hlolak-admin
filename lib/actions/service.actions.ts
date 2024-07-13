// services/services.actions.ts
import { connectDB } from "@/mongoose";
import mongoose, { FilterQuery, SortOrder } from "mongoose";
import Service from "../models/service.models";
import User from "../models/user.models";
import { revalidatePath } from "next/cache";

export interface IService {
  _id: string;
  name: string;
  mobile: string;
  employer: string;
  salary: string;
  provided_service_type: string;
  has_debts: string;
  employee: mongoose.Schema.Types.ObjectId[];
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
export const updateServiceState = async (serviceId: string, newState: 'pending' | 'canceled' | 'done') => {
  try {
    await connectDB();

    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      { state: newState },
      { new: true }
    );

    if (!updatedService) {
      console.error("Service not found");
    }

    return updatedService;
  } catch (error) {
    console.error(error);
    console.error("Failed to update service state");
  }
};
export const assignEmployeeToService = async ({
  serviceId,
  employeeId,
}: AssignEmployeeParams) => {
  try {
    await connectDB();
    const service = await Service.findById(serviceId);
    if (!service) {
      console.error("Service not found!");
    }
    const employee = await User.findById(employeeId);
    await employee.services.push(serviceId);
    await service.employees.push(employeeId);
    await service.save();
    await employee.save();
    return service;
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
    let query: FilterQuery<typeof Service> = { };
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
    return {count:totalServices, services, isNext};
  } catch (error: any) {
    console.log(`not found user: ${error.message}`);
  }
}
export const getAllServices = async () => {
  try {
    await connectDB();
    const services = await Service.countDocuments();
    return services;
  } catch (err) {
    console.error(err);
    console.error('Failed to fetch services!');
  }}
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