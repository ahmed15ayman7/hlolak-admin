"use server";
import { connectDB } from "@/mongoose";
import Testimonial from "../models/testimonials.models";
import { revalidatePath } from "next/cache";

// Function to add a testimonial
export const addTestimonial = async ({
  text,
  author,
  path,
}: {
  text: string;
  author: string;
  path: string;
}) => {
  try {
    await connectDB();
    const newTestimonial = new Testimonial({
      text,
      author,
    });
    await newTestimonial.save();
    revalidatePath(path);
    // return newTestimonial;
  } catch (err) {
    console.error(err);
    console.error("Failed to create testimonial!");
  }
};

// Function to delete a testimonial by ID
export const deleteTestimonial =  async (
  id:string
 ) => {
  try {
    await connectDB();
    const result = await Testimonial.findByIdAndDelete(id);
    return result;
  } catch (err) {
    console.error(err);
    console.error("Failed to delete testimonial!");
  }
};
// Function to get all testimonials
export const getAllTestimonials = async () => {
  try {
    await connectDB();
    const testimonials = await Testimonial.find();
    return testimonials;
  } catch (err) {
    console.error(err);
    console.error("Failed to fetch testimonials!");
  }
};
