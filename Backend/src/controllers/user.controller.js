import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const registerControllers = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: newUser,
        });
    } catch (err) {
        console.error("Registration Error:", err); // ← Add this for debugging
        return res.status(500).json({
            success: false,
            message: "Registration failed. " + err.message,
        });
    }
};

const loginControllers = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // console.log(email, password);

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            });
        }

        const userDoc = await User.findOne({ email });
        if (!userDoc) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, userDoc.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Email or Password",
            });
        }

        const user = userDoc.toObject();
        delete user.password;

        return res.status(200).json({
            success: true,
            message: `Welcome back, ${user.name}`,
            user,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const setAvatarController = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const imageData = req.body.image;

        if (!userId || !imageData) {
            return res.status(400).json({
                success: false,
                message: "User ID and avatar image are required",
            });
        }

        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage: imageData,
            },
            { new: true }
        );

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Avatar set successfully",
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (err) {
        console.error("Set Avatar Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


const allUsers = async (req, res, next) => {
    try {
        const user = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        return res.json(user);
    }
    catch (err) {
        next(err);
    }
}

const forgetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }

    return res.status(200).json({
        success: true,
        message: `Password reset link sent to ${email}`
    });
};

export {
    registerControllers,
    loginControllers,
    setAvatarController,
    allUsers,
    forgetPassword
}