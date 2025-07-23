import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });

  useEffect(() => {
    if (localStorage.getItem("user")) navigate("/");
  }, [navigate]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;

    if (!email || !password) {
      toast.error("Please fill in all fields", toastOptions);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(loginAPI, { email, password });

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        navigate("/");
      } else {
        toast.error(data.message || "Login failed", toastOptions);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login request failed", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Particles Background */}
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

      {/* Login Form */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-gray-900 bg-opacity-90 p-6 sm:p-8 rounded-lg shadow-2xl text-white z-10">
        <div className="text-center mb-6">
          <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white" }} />
          <h2 className="text-2xl sm:text-3xl font-semibold mt-2">Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm sm:text-base">Email address</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm sm:text-base">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
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
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded transition disabled:opacity-60 text-sm sm:text-base"
          >
            {loading ? "Signing in…" : "Login"}
          </button>

          <p className="mt-4 text-sm text-center text-gray-300">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-yellow-400 hover:underline">
              Register
            </Link>
          </p>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
