import mongoose from "mongoose";
const questionSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: { type: String, ref: "QuizModel" },
    title: String,
    type: {
      type: String,
      enum: ["multiple_choice", "true_false", "fill_in_blank"],
      default: "multiple_choice",
    },
    points: { type: Number, default: 1 },
    question: String,
    choices: [String],
    correctAnswer: mongoose.Schema.Types.Mixed,
    answers: [String],
  },
  { collection: "questions" }
);
export default questionSchema;
