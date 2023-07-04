import { Schema, model } from "mongoose";

export interface BookAttr {
  _id: string;
  title: string;
  author: string;
}

export interface BookDoc extends Document {
  title: string;
  author: string;
}

const BookSchema = new Schema({
  title: { type: String, required: [true, "A book must have a title"] },
  author: { type: String, required: [true, "A book must have an author"] },
});

export const BookModel = model<BookDoc>("Books", BookSchema);
