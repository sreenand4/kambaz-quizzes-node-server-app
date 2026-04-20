import AttemptsDao from "./dao.js";

export default function AttemptsRoutes(app) {
  const dao = AttemptsDao();

  // get latest attempt for a student on a quiz
  app.get("/api/attempts/:quizId/:userId", async (req, res) => {
    const { quizId, userId } = req.params;
    const attempt = await dao.findLatestAttempt(userId, quizId);
    res.json(attempt);
  });

  // get how many attempts a student has used
  app.get("/api/attempts/:quizId/:userId/count", async (req, res) => {
    const { quizId, userId } = req.params;
    const count = await dao.countAttempts(userId, quizId);
    res.json({ count });
  });

  // save a new attempt
  app.post("/api/attempts", async (req, res) => {
    const attempt = await dao.createAttempt(req.body);
    res.json(attempt);
  });
}