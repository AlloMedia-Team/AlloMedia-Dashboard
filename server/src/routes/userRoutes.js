import express from "express";
import { getAllUsers } from "../controllers/User/userController.js";
const router = express.Router();

router.get("/", getAllUsers);

export default router;
