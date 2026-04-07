import { v4 as uuidv4 } from "uuid";

export default function QuizzesDao(db) {
  function findQuizzesForCourse(courseId) {
    return db.quizzes.filter((q) => q.course === courseId);
  }

  function findQuizById(quizId) {
    return db.quizzes.find((q) => q._id === quizId);
  }

  function createQuiz(quiz) {
    const newQuiz = { ...quiz, _id: uuidv4() };
    db.quizzes = [...db.quizzes, newQuiz];
    return newQuiz;
  }

  function updateQuiz(quizId, quizUpdates) {
    const quiz = db.quizzes.find((q) => q._id === quizId);
    Object.assign(quiz, quizUpdates);
    return quiz;
  }

  function deleteQuiz(quizId) {
    db.quizzes = db.quizzes.filter((q) => q._id !== quizId);
    return db.quizzes;
  }

  return { findQuizzesForCourse, findQuizById, createQuiz, updateQuiz, deleteQuiz };
}