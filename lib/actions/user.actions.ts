"use server";
import { pusherServer } from "../pusher";
import { connectDB } from "@/mongoose";
import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import User from "../models/user.models";
import bcrypt from "bcrypt";
import { signUpSchema, loginSchema } from "@/lib/validations/authSchemas";
import { redirect } from "next/navigation";
import Service from "../models/service.models";
import { IService } from "./service.actions";

export async function Regester(data: any) {
  try {
    connectDB();
    const { email, password } = signUpSchema.parse(data);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { message: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    let user = await newUser.save();

    return { message: "true", user: user };
  } catch (error: any) {
    return { message: `${error.errors}` };
  }
}
export async function testPusher(data: any) {
  pusherServer.trigger("task", "RoomName", "message");
}
export async function LoginF(data: any) {
  try {
    await connectDB();
    const { email, password } = loginSchema.parse(data);
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("Invalid email or password");
      return { message: "Invalid email or password" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid  password");
      return { message: "Invalid password" };
    }

    console.log("Login successful");
    return { message: "Login successful", user: user };
  } catch (error: any) {
    console.log(error);
    return { message: `${error}` };
  }
}

interface props {
  userId: string | undefined;
  email: string | undefined;
  username: string;
  name: string;
  image: string;
  phone: string;
  path: string;
  type: string;
}
export interface UserData {
  _id: string;
  username: string;
  email: string;
  name: string;
  image: string;
  phone: string;
  onboarding: boolean;
  services: IService[];
}
export interface Result {
  _id: string | undefined;
  email: string | undefined;
  name: string | undefined;
  image: string | undefined;
  id: string | undefined;
  type: string | undefined;
  phone: string | undefined;
}
export async function updateUser({
  userId,
  type,
  email,
  username,
  name,
  image,
  path,
  phone,
}: props) {
  connectDB();
  try {
    let user:UserData|null= await User.findOneAndUpdate(
      { email: email },
      {
        type: type,
        username: username,
        name: name,
        image: image,
        onboarding: true,
        phone: phone,
      },
      { upsert: true }
    ).lean();
    console.log("Successfully updated user");
    if (path.includes("/profile/edit")) {
      revalidatePath(path);
    }
    return user
  } catch (error: any) {
    console.log(`failed to update user: ${error.message}`);
  }
}
export async function fetchUser(email: string | undefined) {
  try {
    connectDB();
    let userInfo: UserData | null = await User.findOne({
      $or: [{ email: email }, { _id: email }],
    });

    if (!userInfo) {
      console.log("user not found");
      console.log("found user with id ");
    }

    return JSON.stringify(userInfo);
  } catch (error: any) {
    console.log(`not found user: ${error.message}`);
  }
}
export async function fetchUserAndService(email: string | undefined) {
  try {
    connectDB();
    let userInfo: UserData | null = await User.findOne({
      $or: [{ email: email }, { _id: email }],
    }).populate({
      path: "services",
      model: Service,
    }).lean();

    if (!userInfo) {
      console.log("user not found");
      console.log("found user with id ");
    }

    return userInfo;
  } catch (error: any) {
    console.log(`not found user: ${error.message}`);
  }
}
export async function fetchAllUser({
  searchString = "",
  pageNum = 1,
  pageSize = 20,
  sortBy = "desc",
  userId,
}: {
  searchString: string;
  pageNum: number;
  pageSize: number;
  userId?: string;
  sortBy?: SortOrder;
}) {
  try {
    connectDB();
    let skipAmount = (pageNum - 1) * pageSize;
    let regex = new RegExp(searchString, "i");
    let query: FilterQuery<typeof User> = userId
      ? { _id: { $ne: userId } }
      : {};
    if (searchString.trim() !== "") {
      query.$or = [
        { name: { $regex: regex } },
        { username: { $regex: regex } },
        { type: { $regex: regex } },
      ];
    }
    let users: UserData[] | undefined | null = await User.find(query)
      .sort({ servicesDone: -1 })
      .skip(skipAmount)
      .limit(pageSize)
      .lean()
      // .exec();
    const totalUsers = await User.countDocuments(query);
    let isNext = users? +totalUsers > skipAmount + users.length:false;
    return { count: totalUsers, users, isNext };
  } catch (error: any) {
    console.log(`not found user: ${error.message}`);
  }
}

// admin

export const addUser = async ({
  name,
  username,
  email,
  password,
  phone,
  type,
  image,
}: {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  type: string;
  image: string;
}) => {
  try {
    connectDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      onboarding: true,
      image,
      type,
      name,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    console.error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (
  id:string
) => {


  try {
    connectDB();
    await User.findByIdAndDelete(id);
    revalidatePath("/dashboard/users");
  } catch (err) {
    console.log(err);
    console.error("Failed to delete user!");
  }

  revalidatePath("/dashboard/products");
};

export const fetchUsersCount = async () => {
  try {
    await connectDB();
    const count = await User.countDocuments({ type: { $ne: "admin" } });
    return count;
  } catch (err) {
    console.log(err);
    console.error("Failed to fetch users!");
  }
};
