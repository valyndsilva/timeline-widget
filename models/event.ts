import mongoose, { Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  desc?: string;
  imgUrl?: string;
  isChecked: boolean;
}

// Create a schema and data model for Event to store in MongoDB
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  imgUrl: { type: String },
  isChecked: { type: Boolean },
});

const Event =
  mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);
export default Event;
