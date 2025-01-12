import { Router } from "express";
import JwtMiddleware from "../middlewares/jwt.middleware.js";
import { signup, login, getProfile, updateProfile, updatePreferences, getPreferences, changePassword } from "../controllers/user.controller.js";

const router = Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', JwtMiddleware, getProfile);
router.put('/profile', JwtMiddleware, updateProfile);
router.put('/preferences', JwtMiddleware, updatePreferences);
router.get('/preferences', JwtMiddleware, getPreferences);
router.put('/change_password', JwtMiddleware, changePassword);

export default router;