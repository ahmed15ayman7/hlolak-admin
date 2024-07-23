import mongoose, { Schema, Document } from 'mongoose';

export interface Blog extends Document {

  id: string;
  title: string;
  date: Date;
  imageUrl: string;
  disc:string
}

const blogSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: Date, default: new Date},
  imageUrl: { type: String, required: true },
  disc: { type: String, required: true },
});

export default mongoose.models.Blog || mongoose.model<Blog>('Blog', blogSchema);
