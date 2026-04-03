import UsersDao from "./dao.js";
import EnrollmentsDao from "../enrollments/dao.js";

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);
  const enrollmentsDao = EnrollmentsDao(db);
  const createUser = (req, res) => {
    const newUser = dao.createUser(req.body);
    res.json(newUser);
  };
  const deleteUser = (req, res) => {
    const sessionUser = req.session["currentUser"];
    if (!sessionUser || sessionUser.role !== "FACULTY") {
      res.sendStatus(403);
      return;
    }
    const { userId } = req.params;
    if (sessionUser._id === userId) {
      res.status(400).json({ message: "Cannot delete your own account" });
      return;
    }
    dao.deleteUser(userId);
    db.enrollments = db.enrollments.filter(
      (enrollment) => enrollment.user !== userId
    );
    res.sendStatus(200);
  };
  const findAllUsers = (req, res) => {
    const users = dao.findAllUsers();
    res.json(users);
  };
  const findUserById = (req, res) => {
    const { userId } = req.params;
    const user = dao.findUserById(userId);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.json(user);
  };
  const updateUser = (req, res) => {
    const sessionUser = req.session["currentUser"];
    if (!sessionUser) {
      res.sendStatus(401);
      return;
    }
    const { userId } = req.params;
    if (sessionUser.role !== "FACULTY" && sessionUser._id !== userId) {
      res.sendStatus(403);
      return;
    }
    const userUpdates = req.body;
    const updated = dao.updateUser(userId, userUpdates);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    if (sessionUser._id === userId) {
      req.session["currentUser"] = updated;
    }
    res.json(updated);
  };
  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  const findUsersForCourse = (req, res) => {
    const { courseId } = req.params;
    const users = enrollmentsDao.findUsersForCourse(courseId);
    res.json(users);
  };
  const createUserForCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || currentUser.role !== "FACULTY") {
      res.sendStatus(403);
      return;
    }
    const { courseId } = req.params;
    const newUser = dao.createUser(req.body);
    enrollmentsDao.enrollUserInCourse(newUser._id, courseId);
    res.json(newUser);
  };
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.get("/api/courses/:courseId/users", findUsersForCourse);
  app.post("/api/courses/:courseId/users", createUserForCourse);
}
