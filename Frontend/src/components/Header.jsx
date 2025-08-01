import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Menu, X } from "lucide-react"; // for hamburger icon

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="w-full sticky top-0 z-20 bg-transparent">
      {/* Particle Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none w-full">
        <Particles
          id="tsparticles"
          init={loadFull}
          options={{
            background: { color: { value: "#0f0f0f" } },
            fpsLimit: 60,
            particles: {
              number: { value: 150, density: { enable: true, value_area: 800 } },
              color: { value: "#ffcc00" },
              shape: { type: "circle" },
              opacity: { value: 0.4, random: true },
              size: { value: 3, random: { enable: true, minimumValue: 1 } },
              links: { enable: false },
              move: { enable: true, speed: 2 },
            },
            detectRetina: true,
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8 text-white bg-transparent">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl sm:text-2xl font-bold cursor-pointer text-yellow-400 hover:text-yellow-300 transition whitespace-nowrap"
        >
          💰E<span className="text-white font-light">xpense</span>
          T<span className="text-white font-light">racker</span>
        </h1>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <>
              {user.isAvatarImageSet ? (
                <img
                  src={`data:image/svg+xml;base64,${user.avatarImage}`}
                  alt="avatar"
                  className="w-10 h-10 rounded-full ring-2 ring-yellow-400 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-lg">
                  {getInitials(user.name)}
                </div>
              )}
              <span className="text-sm hidden md:inline">{user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu Items */}
      {isMenuOpen && (
        <div className="sm:hidden px-4 py-2 space-y-3 text-white bg-black bg-opacity-70 backdrop-blur-md">
          {user ? (
            <>
              <div className="flex items-center gap-3">
                {user.isAvatarImageSet ? (
                  <img
                    src={`data:image/svg+xml;base64,${user.avatarImage}`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full ring-2 ring-yellow-400 object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-lg">
                    {getInitials(user.name)}
                  </div>
                )}
                <span className="text-sm">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/register");
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
