import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";
const userRoute = express.Router();

userRoute.put("/:id", updateUser);
userRoute.delete("/:id", deleteUser);
userRoute.get("/:id", getUser);
userRoute.get("/", getAllUsers);

export default userRoute;
