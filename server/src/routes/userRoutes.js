import express from "express";
import { getAllUsers, getAllDeliverysMan } from "../controllers/User/userController.js";
const router = express.Router();

router.get("/", getAllUsers);
router.get('/get/deliverys/users', getAllDeliverysMan)

export default router;
