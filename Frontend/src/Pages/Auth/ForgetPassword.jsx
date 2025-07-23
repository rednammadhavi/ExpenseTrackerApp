import React, { useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Link } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { forgetPasswordAPI } from "../../utils/ApiRequest";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        theme: "dark",
    };

    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(forgetPasswordAPI, { email });
            if (response.data.success) {
                toast.success("Reset link sent to your email.", toastOptions);
                setSubmitted(true);
            } else {
                toast.error(response.data.message || "Failed to send reset link", toastOptions);
            }
        } catch (error) {
            toast.error("Something went wrong. Try again.", toastOptions);
        }

        setLoading(false);
    };

    return (
        <div className="relative min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: { color: { value: "#000" } },
                    fpsLimit: 60,
                    particles: {
                        number: { value: 200, density: { enable: true, value_area: 800 } },
                        color: { value: "#ffcc00" },
                        shape: { type: "circle" },
                        opacity: { value: 0.5, random: true },
                        size: { value: 3, random: { enable: true, minimumValue: 1 } },
                        move: { enable: true, speed: 2 },
                        life: {
                            duration: { sync: false, value: 3 },
                            delay: { random: { enable: true, minimumValue: 0.5 }, value: 1 },
                        },
                    },
                    detectRetina: true,
                }}
                className="absolute inset-0 -z-10"
            />

            <div className="w-full max-w-md bg-gray-900 bg-opacity-80 rounded-lg shadow-lg text-white p-6 sm:p-8">
                <div className="text-center mb-6">
                    <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white" }} />
                    <h2 className="text-2xl sm:text-3xl font-semibold mt-2">
                        Expense Management System
                    </h2>
                    <h3 className="text-xl mt-4">Forgot Password</h3>
                </div>

                {submitted ? (
                    <div className="text-green-400 text-center font-semibold text-sm sm:text-base">
                        Password reset link sent to{" "}
                        <span className="underline">{email}</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm">Email address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
                                placeholder="Enter your registered email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded disabled:opacity-60 transition duration-200"
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>
                )}

                <div className="text-center mt-6">
                    <Link
                        to="/login"
                        className="text-sm text-yellow-300 hover:underline transition"
                    >
                        Back to Login
                    </Link>
                </div>

                <ToastContainer />
            </div>
        </div>
    );
};

export default ForgetPassword;
