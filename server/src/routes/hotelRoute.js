import express from "express";
import { createHotel } from "../controllers/hotelController.js";
const hotelRoute = express.Router();

hotelRoute.post("/", createHotel);

export default hotelRoute;
