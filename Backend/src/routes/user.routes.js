// src/routes/user.routes.js
import express from 'express';
import {
    loginControllers,
    registerControllers,
    setAvatarController,
    forgetPassword
} from '../controllers/user.controller.js';

const router = express.Router();

router.route("/register").post(registerControllers);
router.route("/login").post(loginControllers);
router.route("/setAvatar/:id").post(setAvatarController);
router.route("/forgot-password").post(forgetPassword);

export { router };
