import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AttemptsDao() {
  // get the most recent attempt for a student on a specific quiz
  function findLatestAttempt(userId, quizId) {
    return model
      .findOne({ user: userId, quiz: quizId })
      .sort({ attemptNumber: -1 });
  }

  // count how many times a student has taken a quiz
  function countAttempts(userId, quizId) {
    return model.countDocuments({ user: userId, quiz: quizId });
  }

  // save a new attempt when student submits
  function createAttempt(attempt) {
    return model.create({ ...attempt, _id: uuidv4() });
  }

  return { findLatestAttempt, countAttempts, createAttempt };
}