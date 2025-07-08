import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.route.js";
import messageRoutes from "./routes/message.route.js";
import { dbConnect } from "./lib/dbConnect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();
const port = process.env.PORT || 8001;
const __dirname = path.resolve();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://chattyfrontend.netlify.app"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.get("/", (req, res) => {
  res.send({activeStatus: true, error: false})
})
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    if (!req.originalUrl.startsWith("/api")) {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    }
  });
}

server.listen(port, () => {
  console.log("Listening on Port", port);
  dbConnect();
});
