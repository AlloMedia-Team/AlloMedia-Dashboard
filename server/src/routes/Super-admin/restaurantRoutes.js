import express from "express";
import {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  fetchingPendingRestaurant,
  acceptingRestaurant,
} from "../../controllers/Super-admin/restaurantController.js";

const router = express.Router();

// Basic CRUD routes
router.get("/pending", fetchingPendingRestaurant);
router.get('/accepted/:id', acceptingRestaurant)

router.get("/", getAllRestaurants);
router.get("/:id", getRestaurant);
router.post("/", createRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;
