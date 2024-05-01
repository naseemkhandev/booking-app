import express from "express";
import cookieParser from "cookie-parser";

import authRoute from "./routes/authRoute.js";
import hotelRoute from "./routes/hotelRoute.js";
import { config } from "./config/config.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoute);

// handling errors
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: config.env === "production" ? "" : err.stack,
  });
});

export default app;
