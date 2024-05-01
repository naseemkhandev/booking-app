import express from "express";
import {
  createHotel,
  deleteHotel,
  updateHotel,
  getHotel,
} from "../controllers/hotelController.js";
const hotelRoute = express.Router();

hotelRoute.post("/", createHotel);
hotelRoute.put("/:id", updateHotel);
hotelRoute.delete("/:id", deleteHotel);
hotelRoute.get("/:id", getHotel);

export default hotelRoute;
