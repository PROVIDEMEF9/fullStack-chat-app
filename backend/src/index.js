import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import path  from "path";
import { app, server } from "./lib/socket.js";

// const cookieParser=require("cookie-parser");
// const authRoutes=require("./routes/auth.routes.js");
// const messageRoutes=require("./routes/message.routes.js");
// const { connectDB } = require("./lib/db.js");
// const cors=require("cors");
// const {path }=require("path");
// const {app,server} =require("./lib/socket.js");



dotenv.config();

const  PORT=process.env.PORT
const __dirname=path.resolve();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser({ limit: "50mb", extended: true }));

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
  }



server.listen(PORT,
    ()=>{console.log("server is running at port:"+PORT);
connectDB();
});