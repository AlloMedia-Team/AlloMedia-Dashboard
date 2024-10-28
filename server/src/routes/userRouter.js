import express from 'express'
const Router = express.Router();
import { getAllDeliverysMan } from '../controllers/User/userController.js'

Router.get('/get/deliverys/users', getAllDeliverysMan)

export default Router;