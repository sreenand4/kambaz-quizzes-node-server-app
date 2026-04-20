import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import session from "express-session";
import db from "./Kambaz/Database/index.js";

const CONNECTION_STRING =
  process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27018/kambaz-quizzes";
mongoose.connect(CONNECTION_STRING);
import UserRoutes from "./Kambaz/users/routes.js";
import CourseRoutes from "./Kambaz/courses/routes.js";
import ModulesRoutes from "./Kambaz/modules/routes.js";
import AssignmentsRoutes from "./Kambaz/assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/enrollments/routes.js";
import QuizzesRoutes from "./Kambaz/quizzes/routes.js";
import QuestionsRoutes from "./Kambaz/questions/routes.js";
import AttemptsRoutes from "./Kambaz/attempts/routes.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:4000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  app.set("trust proxy", 1);
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
  console.log("Session options:", sessionOptions);
}
app.use(session(sessionOptions));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app);
EnrollmentsRoutes(app, db);
QuizzesRoutes(app);
QuestionsRoutes(app);
AttemptsRoutes(app);
Lab5(app);
Hello(app);
const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(
    `Kambaz API listening on port ${port} (SERVER_ENV=${process.env.SERVER_ENV ?? "not set"})`
  );
});
