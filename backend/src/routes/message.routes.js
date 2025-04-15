import express from "express";
import{ protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, getMessages, sendMessages } from "../controllers/message.controller.js";
// const express=require("express");
// const { protectRoute } = require("../middleware/auth.middleware");
// const { getUsersForSidebar, getMessages, sendMessages } = require("../controllers/message.controller");

const router=express.Router();

router.get("/users",protectRoute,getUsersForSidebar);
router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessages);

export default router;