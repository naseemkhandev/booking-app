import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
} from "../controllers/roomController.js";
import verifyAdmin from "../middlewares/VerifyAdmin.js";
const roomRoute = express.Router();

roomRoute.post("/:hotelId", verifyAdmin, createRoom);
roomRoute.put("/:id", verifyAdmin, updateRoom);
roomRoute.delete("/:id/:hotelId", verifyAdmin, deleteRoom);
roomRoute.get("/:id", getRoom);
roomRoute.get("/", getAllRooms);

export default roomRoute;
