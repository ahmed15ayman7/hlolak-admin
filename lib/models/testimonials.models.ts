// models/testimonial.models.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const testimonialSchema = new Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date,default: new Date},
});

const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
