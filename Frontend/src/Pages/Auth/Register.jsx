import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import axios from "axios";
import { registerAPI } from "../../utils/ApiRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    const { name, email, password } = values;

    if (!name || !email || !password) {
      toast.error("Please fill in all fields", toastOptions);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(registerAPI, values);

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        navigate("/setavatar");
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed",
        toastOptions
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-xl text-white">
        <div className="text-center mb-6">
          <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white" }} />
          <h2 className="text-2xl font-semibold mt-2">Register</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Your name"
              value={values.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter email"
              value={values.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-sm mt-4 text-gray-300 text-center">
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
