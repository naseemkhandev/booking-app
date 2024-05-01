import express from "express";
import authRoute from "./routes/authRoute.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoute);

export default app;
