import express from "express";
import {
  createHotel,
  deleteHotel,
  updateHotel,
  getHotel,
  getAllHotels,
  countByCity,
  countByType,
} from "../controllers/hotelController.js";
import verifyAdmin from "../middlewares/VerifyAdmin.js";
const hotelRoute = express.Router();

hotelRoute.post("/", verifyAdmin, createHotel);
hotelRoute.put("/:id", verifyAdmin, updateHotel);
hotelRoute.delete("/:id", verifyAdmin, deleteHotel);
hotelRoute.get("/find/:id", getHotel);
hotelRoute.get("/", getAllHotels);
hotelRoute.get("/count-by-city", countByCity);
hotelRoute.get("/count-by-type", countByType);

export default hotelRoute;
