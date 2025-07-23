import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import SetAvatar from "./Pages/Avatar/setAvatar";
import Home from "./Pages/Home/Home";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function App() {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <BrowserRouter>
      {/* 🔧 Background Particle Animation (fixed behind everything) */}
      <div className="fixed inset-0 -z-10">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: { value: "#0f0f0f" } },
            fpsLimit: 60,
            particles: {
              number: { value: 150, density: { enable: true, value_area: 800 } },
              color: { value: "#ffcc00" },
              shape: { type: "circle" },
              opacity: { value: 0.4, random: true },
              size: { value: 3, random: { enable: true, minimumValue: 1 } },
              move: { enable: true, speed: 2 },
              links: { enable: false }
            },
            detectRetina: true,
          }}
        />
      </div>

      <Header />

      {/* ✅ Main content sits above particle layer */}
      <main className="relative z-10 min-h-[70vh] text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setavatar" element={<SetAvatar />} />
          <Route path="/forgotPassword" element={<ForgetPassword />} />
          <Route path="*" element={<div className="text-center mt-10 text-xl text-gray-400">404 - Page Not Found</div>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
