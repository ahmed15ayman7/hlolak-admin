"use server";
import { connectDB } from "@/mongoose";
import { revalidatePath } from "next/cache";
import  Offers  from '../models/Offers.models';

interface OffersParams {
  title: string;
  path: string;
  imageUrl: string;
  disc: string;
}
export interface OffersItem {
  _id: string;
  title: string;
  date: Date;
  imageUrl: string;
  disc: string;
}
export const addOffers = async ({ path, title, imageUrl,disc }: OffersParams) => {
  try {
    await connectDB();
    const newOffers = new Offers({
      id: `${Math.random()}`,
      title,
      imageUrl,
      disc
    });
    await newOffers.save();
    if (path && typeof path === "string") {
      await revalidatePath(path);
      console.log(`Path revalidated: ${path}`);
    } else {
      console.error("Invalid path for revalidation");
    }
    // redirect(path)
    // return newOffers;
  } catch (err) {
    console.error(err);
    console.error("Failed to add gallery item!");
  }
};

export const deleteOffers = async (id: string) => {
  try {
    await connectDB();
    const result = await Offers.deleteOne({ _id: id });
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
export const getAllOfferss = async () => {
  try {
    await connectDB();
    const galleryItems = await Offers.find();

    console.log(galleryItems);
    return galleryItems;
  } catch (err) {
    console.error(err);
    console.error("Failed to fetch gallery items!");
  }
};
