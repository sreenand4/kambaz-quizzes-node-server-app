import QuestionsDao from "./dao.js";

export default function QuestionsRoutes(app) {
  const dao = QuestionsDao();

  const findQuestionsForQuiz = async (req, res) => {
    const { quizId } = req.params;
    const questions = await dao.findQuestionsForQuiz(quizId);
    res.json(questions);
  };

  const findQuestionById = async (req, res) => {
    const { questionId } = req.params;
    const question = await dao.findQuestionById(questionId);
    if (!question) return res.sendStatus(404);
    res.json(question);
  };

  const createQuestionForQuiz = async (req, res) => {
    const { quizId } = req.params;
    const question = { ...req.body, quiz: quizId };
    const newQuestion = await dao.createQuestion(question);
    res.json(newQuestion);
  };

  const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    const questionUpdates = req.body;
    const updatedQuestion = await dao.updateQuestion(questionId, questionUpdates);
    res.json(updatedQuestion);
  };

  const deleteQuestion = async (req, res) => {
    const { questionId } = req.params;
    const status = await dao.deleteQuestion(questionId);
    res.json(status);
  };

  app.get("/api/quizzes/:quizId/questions", findQuestionsForQuiz);
  app.get("/api/questions/:questionId", findQuestionById);
  app.post("/api/quizzes/:quizId/questions", createQuestionForQuiz);
  app.put("/api/questions/:questionId", updateQuestion);
  app.delete("/api/questions/:questionId", deleteQuestion);
}
