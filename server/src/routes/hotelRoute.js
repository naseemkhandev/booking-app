import express from "express";
import {
  createHotel,
  deleteHotel,
  updateHotel,
  getHotel,
  getAllHotels,
} from "../controllers/hotelController.js";
import verifyAdmin from "../middlewares/VerifyAdmin.js";
const hotelRoute = express.Router();

hotelRoute.post("/", verifyAdmin, createHotel);
hotelRoute.put("/:id", verifyAdmin, updateHotel);
hotelRoute.delete("/:id", verifyAdmin, deleteHotel);
hotelRoute.get("/:id", getHotel);
hotelRoute.get("/", getAllHotels);

export default hotelRoute;
