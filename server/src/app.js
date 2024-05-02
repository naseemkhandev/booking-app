import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { config } from "./config/config.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import hotelRoute from "./routes/hotelRoute.js";
import roomRoute from "./routes/roomRoute.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);

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
