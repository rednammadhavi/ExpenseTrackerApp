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

    setLoading(true);
    const { data } = await axios.post(registerAPI, { name, email, password });

    if (data.success === true) {
      delete data.user.password;
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(data.message, toastOptions);
      navigate("/");
    } else {
      toast.error(data.message, toastOptions);
    }

    setLoading(false);
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

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
          <h2 className="text-xl font-semibold mt-2">
            Welcome to Expense Management System
          </h2>
          <h3 className="text-white text-xl mt-4">Registration</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Full name"
              value={values.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Email address</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter email"
              value={values.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col items-center">
            <Link to="/forgotPassword" className="text-sm text-yellow-300 hover:underline">
              Forgot Password?
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-red-600 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded disabled:opacity-60"
            >
              {loading ? "Registering..." : "Signup"}
            </button>

            <p className="mt-3 text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-yellow-300 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
