import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerAPI } from "../../utils/ApiRequest";

const Register = () => {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) navigate("/");
  }, [navigate]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    theme: "dark",
  };

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = values;

    if (!name || !email || !password) {
      toast.error("Please fill in all fields", toastOptions);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(registerAPI, { name, email, password });

      if (data.success) {
        delete data.user.password;
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        navigate("/");
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4">
      {/* Background particles */}
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

      {/* Registration Form */}
      <div className="max-w-md w-full bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-xl text-white z-10">
        <div className="text-center mb-6">
          <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white" }} />
          <h2 className="text-2xl font-semibold mt-2">Register</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your name"
              value={values.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
            />
          </div>

          <div className="text-right">
            <Link to="/forgotPassword" className="text-sm text-yellow-300 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>

          <p className="mt-4 text-sm text-center text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 hover:underline">
              Login
            </Link>
          </p>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
