"use server";
import { connectDB } from "@/mongoose";
import GalleryItem from "../models/galleryItem.models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface AddGalleryItemParams {
  title: string;
  path: string;
  imageUrl: string;
}
export interface GalleryItem  {
  _id: string;
  title: string;
  date: Date;
  imageUrl: string;
}
export const addGalleryItem = async ({
  path,
  title,
  imageUrl,
}: AddGalleryItemParams) => {
  try {
    await connectDB();
    const newGalleryItem = new GalleryItem({
      id:`${Math.random()}`,
      title,
      imageUrl,
    });
    await newGalleryItem.save();
    if (path && typeof path === "string") {
      await revalidatePath(path);
      console.log(`Path revalidated: ${path}`);
    } else {
      console.error("Invalid path for revalidation");
    }
    // redirect(path)
    // return newGalleryItem;
  } catch (err) {
    console.error(err);
    console.error("Failed to add gallery item!");
  }
};

export const deleteGalleryItem = async (id: string) => {
  try {
    await connectDB();
    const result = await GalleryItem.deleteOne({_id: id });
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
export const getAllGalleryItems = async () => {
  try {
    await connectDB();
    const galleryItems = await GalleryItem.find();
    
    console.log(galleryItems);
    return galleryItems;
  } catch (err) {
    console.error(err);
    console.error("Failed to fetch gallery items!");
  }
};
