import express from "express";
import { createRoom } from "../controllers/roomController.js";
const roomRoute = express.Router();

roomRoute.post("/create", createRoom);

export default roomRoute;
