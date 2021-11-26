import express from "express"
import { registerController } from "../controllers/registerController.js"
import { loginController } from "../controllers/loginController.js"
import { profileController } from "../controllers/profileController.js"
import { refreshController } from "../controllers/refreshController.js"
import { postController } from "../controllers/postController.js"
import authMiddleware from "../middlewares/auth/authmiddleware.js";

const router = express.Router();

router.post('/register', registerController.register)
router.post('/login', loginController.login)
router.post('/logout', authMiddleware, loginController.logout)
router.get('/profile', authMiddleware, profileController.getProfile)
router.post('/refreshToken', authMiddleware, refreshController.refresh)
router.post('/createPost', authMiddleware, postController.createPost)
router.put('/likePost/:postId', authMiddleware, postController.likePost)
router.put('/postComment/:postId', authMiddleware, postController.postComments)

router.get('/getPosts', authMiddleware, postController.getPosts)


export default router;