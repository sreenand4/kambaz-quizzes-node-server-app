import mongoose from "mongoose";

// stores one attempt per student per quiz
// answers is a map of questionId -> what they picked
const attemptSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: { type: String, ref: "QuizModel" },
    user: { type: String, ref: "UserModel" },
    answers: mongoose.Schema.Types.Mixed,
    score: Number,
    totalPoints: Number,
    attemptNumber: Number,
    submittedAt: { type: Date, default: Date.now },
  },
  { collection: "attempts" }
);

export default attemptSchema;