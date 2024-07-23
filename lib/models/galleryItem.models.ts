import mongoose, { Schema, Document } from 'mongoose';

export interface GalleryItem extends Document {

  id: string;
  title: string;
  date: Date;
  imageUrl: string;
}

const GalleryItemSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: Date, default: new Date},
  imageUrl: { type: String, required: true },
});

export default mongoose.models.GalleryItem || mongoose.model<GalleryItem>('GalleryItem', GalleryItemSchema);
