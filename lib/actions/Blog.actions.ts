"use server";
import { connectDB } from "@/mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import  Blog  from '../models/blog.models';

interface BlogParams {
  title: string;
  path: string;
  imageUrl: string;
  disc: string;
}
export interface BlogItem {
  _id: string;
  title: string;
  date: Date;
  imageUrl: string;
  disc: string;
}
export const addBlog = async ({ path, title, imageUrl,disc }: BlogParams) => {
  try {
    await connectDB();
    const newBlog = new Blog({
      id: `${Math.random()}`,
      title,
      imageUrl,
      disc
    });
    await newBlog.save();
    if (path && typeof path === "string") {
      await revalidatePath(path);
      console.log(`Path revalidated: ${path}`);
    } else {
      console.error("Invalid path for revalidation");
    }
    // redirect(path)
    // return newBlog;
  } catch (err) {
    console.error(err);
    console.error("Failed to add gallery item!");
  }
};

export const deleteBlog = async (
 id:string
) => {

  try {
    await connectDB();
    const result = await Blog.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      console.log("Item deleted successfully");
    } else {
      console.log("Item not found");
    }
  } catch (err) {
    console.error(err);
    console.error("Failed to delete gallery item!");
  }
};
export const getAllBlogs = async () => {
  try {
    await connectDB();
    const galleryItems = await Blog.find();

    console.log(galleryItems);
    return galleryItems;
  } catch (err) {
    console.error(err);
    console.error("Failed to fetch gallery items!");
  }
};
