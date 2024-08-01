"use server";
import { connectDB } from "@/mongoose";
import { FilterQuery, SortOrder } from "mongoose";
import Service from "../models/service.models";
import User from "../models/user.models";
import { revalidatePath } from "next/cache";
import { UserData } from "./user.actions";
import { pusherServer } from "../pusher";
import moment from "moment";
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
  state: "pending" | "canceled" | "done" | "created";
  step: string;
  notes: {
    note: string;
    state: string;
    name: string;
  }[];
  communication: string;
  employeeExl: {
    name: string;
    _id: undefined;
  };
  bank?: string;                   // New field
  stop?: string;                   // New field
  appointment_date?: string;      // New field
  id_number?: string;             // New field
  property_value?: string;        // New field
  property_status?: string;       // New field
  property_age?: string;          // New field
  net_salary?: string;            // New field
  gross_salary?: string;          // New field
}

interface AddServiceParams {
  name: string;
  mobile: string;
  employer: string;
  salary: number;
  provided_service_type: string;
  has_debts: string;
}
interface AddServiceEXcelParams {
  name: string;
  mobile: string;
  employee: string;
  communication: string;
  notes: { name: string; note: string; state: string };
  state: string;
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
export const addServiceEXcel = async (services: AddServiceEXcelParams[]) => {
  try {
    await connectDB();
    services.forEach(async (service) => {
      const newService = new Service({
        name: service.name,
        mobile: service.mobile,
        employeeExl: {
          name: service.employee,
        },
        communication: service.communication,
        notes: service.notes,
        state: service.state,
      });
      await newService.save();
    });
  } catch (err) {
    console.error(err);
    console.error("Failed to create service!");
  }
};
export const updateServiceState = async (
  serviceId: string,
  newState: "pending" | "canceled" | "done" | "created",
  employeeName: string,
  serviceName: string,
  note: string,
  employeeId: string,
  bank?: string,
  stop?: string,
  appointment_date?: string,
  id_number?: string,
  property_value?: string,
  property_status?: string,
  property_age?: string,
  net_salary?: string,
  gross_salary?: string
) => {
  try {
    await connectDB();
    const updateQuery: any = {
      state: newState,
      ...(newState === "done" ? { step: 2 }:{}),
      ...(bank ? { bank }:{}),
      ...(stop ? { stop }:{}),
      ...(appointment_date ?{ appointment_date }:{}),
      ...(id_number ? { id_number }:{}),
      ...(property_value ? { property_value }:{}),
      ...(property_status ? { property_status }:{}),
      ...(property_age ? { property_age }:{}),
      ...(net_salary ? { net_salary }:{}),
      ...(gross_salary ? { gross_salary }:{}),
    };
    console.log(updateQuery)
    // Perform the update
    const updatedService:IService|null = await Service.findByIdAndUpdate(serviceId, updateQuery, { new: true }).lean();
    if (!updatedService) {
      console.error("Service not found");
      return null;
    }

    // Fetch the updated service to add notes
    if (newState === "done") {
      const employee = await User.findById(employeeId);
      if (employee) {
        await employee.servicesDone.push(serviceId);
        await employee.save(); // Ensure the employee's servicesDone list is saved
      }
    }
    
    if (note.length > 0) {
      const updatedService2 = await Service.findById(serviceId);
      updatedService2?.notes.push({
        note: note,
        name: employeeName,
        state: newState,
      });
      await updatedService2.save(); // Save notes if any
    }

    // Send notification via Pusher
    const message = {
      name: employeeName,
      content: `Service ${serviceName} is ${newState}`,
      image: "/noavatar.png",
      link: `/dashboard/services/${serviceId}`,
    };
    pusherServer.trigger("AdminChannel", "admin", message);
    return updatedService;
  } catch (error) {
    console.error(error);
    console.error("Failed to update service state");
    throw error; // Re-throw the error to handle it at the caller level
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
    if (newState === "done") {
      await Service.findByIdAndUpdate(serviceId, { state: "pending" });
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
      query.$or = [{ name: { $regex: regex } }, { mobile: { $regex: regex } }];
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

const getArabicMonthName = (monthNumber: number) => {
  switch (monthNumber) {
    case 0:
      return "يناير";
    case 1:
      return "فبراير";
    case 2:
      return "مارس";
    case 3:
      return "أبريل";
    case 4:
      return "مايو";
    case 5:
      return "يونيو";
    case 6:
      return "يوليو";
    case 7:
      return "أغسطس";
    case 8:
      return "سبتمبر";
    case 9:
      return "أكتوبر";
    case 10:
      return "نوفمبر";
    case 11:
      return "ديسمبر";
    default:
      return "";
  }
};

const getData = async () => {
  try {
    await connectDB();
    const services = await Service.find().lean();

    // Initialize an empty map to store the results
    const resultMap = new Map();

    services.forEach((service) => {
      const createdAt = moment(service.createdAt);
      const month = createdAt.month(); // Get month number (0-11)
      const year = createdAt.year(); // Get year
      const state = service.state;

      const arabicMonthName = getArabicMonthName(month); // Get month name in Arabic

      const key = `${year}-${arabicMonthName}`;
      if (!resultMap.has(key)) {
        resultMap.set(key, {
          month: arabicMonthName,
          year,
          جديد: 0,
          تمت: 0,
          جاريه: 0,
          رُفضت: 0,
        });
      }

      const data = resultMap.get(key);
      switch (state) {
        case "created":
          data["جديد"]++;
          break;
        case "done":
          data["تمت"]++;
          break;
        case "pending":
          data["جاريه"]++;
          break;
        case "canceled":
          data["رُفضت"]++;
          break;
        default:
          break;
      }

      resultMap.set(key, data);
    });

    const formattedData = Array.from(resultMap.values());
    console.log("Formatted data: ", formattedData);

    return formattedData;
  } catch (e) {
    console.error("Error fetching data: ", e);
  }
};

export default getData;
