import express from "express";
import authRoute from "./routes/authRoute.js";
import hotelRoute from "./routes/hotelRoute.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoute);

export default app;
