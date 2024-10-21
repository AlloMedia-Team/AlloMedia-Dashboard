import express from "express";
import {
  Menus,
  ShowMenu,
  ShowMenuItem,
  StoreMenu,
  UpdateMenu,
  DeleteMenu,
} from "../controllers/menuController.js";
import { authMiddleware, managerMiddleware } from "../middlewares/menuMiddleware.js";

const router = express.Router();

// Public Routes (Accessible without authentication)
router.get("/", Menus); // Display all menus
router.get("/:restaurantName/menu", ShowMenu); // Display menu by restaurant
router.get("/:restaurantName/:itemName", ShowMenuItem); // Display menu item by restaurant

// Protected Routes (Only Managers can access)
router.post(
  "/store-menu",
  authMiddleware,
  managerMiddleware,
  StoreMenu
); // Create a new menu

router.post(
  "/:restaurantName/update-menu",
  authMiddleware,
  managerMiddleware,
  UpdateMenu
); // Update a menu

router.post(
  "/:restaurantName/delete-menu",
  authMiddleware,
  managerMiddleware,
  DeleteMenu
); // Delete a menu

export default router;
