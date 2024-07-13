"use server";
import { pusherServer } from "../pusher";
import { connectDB } from "@/mongoose";
import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import User from "../models/user.models";
import bcrypt from "bcrypt";
import { signUpSchema, loginSchema } from "@/lib/validations/authSchemas";
import { redirect } from "next/navigation";

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
}: props): Promise<void> {
  connectDB();
  try {
    let user = await User.findOneAndUpdate(
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
    );
    console.log("Successfully updated user");
    if (path.includes("/profile/edit")) {
      revalidatePath(path);
    }
    return user;
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
export async function fetchAllUser({
  searchString = "",
  pageNum = 1,
  pageSize = 20,
  sortBy = "desc",
  userId,
}: {
  searchString: string;
  userId: string;
  pageNum: number;
  pageSize: number;
  sortBy?: SortOrder;
}) {
  try {
    connectDB();
    let skipAmount = (pageNum - 1) * pageSize;
    let regex = new RegExp(searchString, "i");
    let query: FilterQuery<typeof User> = { _id: { $ne: userId } };
    if (searchString.trim() !== "") {
      query.$or = [
        { name: { $regex: regex } },
        { username: { $regex: regex } },
        { sport: { $regex: regex } },
      ];
    }
    let users = await User.find(query)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .exec();
    const totalUsers = await User.countDocuments(query);
    let isNext = +totalUsers > skipAmount + users.length;
    return { count: totalUsers, users, isNext };
  } catch (error: any) {
    console.log(`not found user: ${error.message}`);
  }
}
export async function fetchUserPosts(userId: string) {
  connectDB();
  try {
    let posts: Result | null = await User.findOne({ id: userId });

    return posts;
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
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (
  formData: Iterable<readonly [PropertyKey, any]>
) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
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
    throw new Error("Failed to fetch users!");
  }
};
