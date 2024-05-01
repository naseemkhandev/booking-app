import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import verifyUser from "../middlewares/VerifyUser.js";
import verifyAdmin from "../middlewares/VerifyAdmin.js";
const userRoute = express.Router();

userRoute.put("/:id", verifyUser, updateUser);
userRoute.delete("/:id", verifyUser, deleteUser);
userRoute.get("/:id", verifyUser, getUser);
userRoute.get("/", verifyAdmin, getAllUsers);

export default userRoute;
