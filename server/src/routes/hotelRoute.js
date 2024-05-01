import express from "express";
import {
  createHotel,
  deleteHotel,
  updateHotel,
} from "../controllers/hotelController.js";
const hotelRoute = express.Router();

hotelRoute.post("/", createHotel);
hotelRoute.put("/:id", updateHotel);
hotelRoute.delete("/:id", deleteHotel);

export default hotelRoute;
