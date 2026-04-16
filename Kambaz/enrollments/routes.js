import EnrollmentsDao from "./dao.js";
import enrollmentModel from "./model.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findMyEnrollments = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const enrollments = await enrollmentModel.find({ user: currentUser._id });
    res.json(enrollments);
  };

  const enrollInCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const enrollment = await dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  };

  const unenrollFromCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const status = await dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.json(status);
  };

  app.get("/api/users/current/enrollments", findMyEnrollments);
  app.post("/api/users/current/courses/:courseId/enrollment", enrollInCourse);
  app.delete(
    "/api/users/current/courses/:courseId/enrollment",
    unenrollFromCourse
  );
}
