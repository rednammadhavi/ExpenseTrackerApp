import express from 'express';
import {
    loginControllers,
    registerControllers,
    setAvatarController
} from '../controllers/user.controller.js';

const router = express.Router();

router.route("/register").post(registerControllers);

router.route("/login").post(loginControllers);

router.route("/setAvatar/:id").post(setAvatarController);

export { router };