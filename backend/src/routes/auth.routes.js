import express from "express";
import dotenv from "dotenv";
import { signup,login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
// const { signup, login, logout, updateProfile, checkAuth } = require("../controllers/auth.controller.js");
// const { protectRoute } = require("../middleware/auth.middleware.js");

const router=express.Router();

router.post("/signup",signup);


router.post("/login",login);


router.post("/logout",logout);


router.put("/update-profile",protectRoute,updateProfile);

router.get("/check",protectRoute,checkAuth);

export default router;

// mongodb password

// eBwHkuCt8m9SirIk