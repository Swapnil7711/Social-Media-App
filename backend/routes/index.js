import express from "express"
import { registerController } from "../controllers/registerController.js"
import { loginController } from "../controllers/loginController.js"
import authMiddleware from "../middlewares/auth/authmiddleware.js";
const router = express.Router();

router.post('/register', registerController.register)
router.post('/login', loginController.login)
router.post('/logout', authMiddleware, loginController.logout)


export default router;