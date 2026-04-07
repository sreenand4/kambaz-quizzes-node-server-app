import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app, db) {
  const dao = QuizzesDao(db);

  app.get("/api/courses/:courseId/quizzes", (req, res) => {
    res.json(dao.findQuizzesForCourse(req.params.courseId));
  });

  app.get("/api/quizzes/:quizId", (req, res) => {
    const quiz = dao.findQuizById(req.params.quizId);
    if (!quiz) return res.sendStatus(404);
    res.json(quiz);
  });

  app.post("/api/courses/:courseId/quizzes", (req, res) => {
    const quiz = { ...req.body, course: req.params.courseId };
    res.json(dao.createQuiz(quiz));
  });

  app.put("/api/quizzes/:quizId", (req, res) => {
    res.json(dao.updateQuiz(req.params.quizId, req.body));
  });

  app.delete("/api/quizzes/:quizId", (req, res) => {
    res.json(dao.deleteQuiz(req.params.quizId));
  });
}