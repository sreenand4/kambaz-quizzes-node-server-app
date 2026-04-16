import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: { type: String, ref: "CourseModel" },
    availableFrom: String,
    availableUntil: String,
    dueDate: String,
    points: Number,
    description: String,
  },
  { collection: "assignments" }
);
export default assignmentSchema;
