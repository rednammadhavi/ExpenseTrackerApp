import React, { useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Link } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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
            // 🔧 Replace with your real API endpoint
            const response = await axios.post("/api/forgot-password", { email });
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
        <div className="relative min-h-screen bg-black overflow-hidden">
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

            <div className="max-w-md mx-auto mt-24 px-6 py-8 bg-gray-900 bg-opacity-80 rounded-md shadow-lg text-white">
                <div className="text-center mb-6">
                    <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white" }} />
                    <h2 className="text-xl font-semibold mt-2">Expense Management System</h2>
                    <h3 className="text-white text-xl mt-4">Forgot Password</h3>
                </div>

                {submitted ? (
                    <div className="text-green-400 text-center font-semibold">
                        Password reset link sent to <span className="underline">{email}</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-1">Email address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="Enter your registered email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded disabled:opacity-60"
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>
                )}

                <div className="text-center mt-6">
                    <Link to="/login" className="text-sm text-yellow-300 hover:underline">
                        Back to Login
                    </Link>
                </div>

                <ToastContainer />
            </div>
        </div>
    );
};

export default ForgetPassword;
