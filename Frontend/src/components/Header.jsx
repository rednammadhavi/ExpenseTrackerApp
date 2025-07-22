import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleLogin = () => navigate("/login");

  return (
    <div className="relative overflow-hidden w-full">
      <Particles
        id="tsparticles"
        init={loadFull}
        options={{
          background: { color: { value: '#000' } },
          fpsLimit: 60,
          particles: {
            number: { value: 200, density: { enable: true, value_area: 800 } },
            color: { value: '#ffcc00' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: { enable: true, minimumValue: 1 } },
            links: { enable: false },
            move: { enable: true, speed: 2 },
            life: {
              duration: { value: 3 },
              count: 0,
              delay: { value: 1, random: { enable: true, minimumValue: 0.5 } },
            },
          },
          detectRetina: true,
        }}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      <nav className="flex justify-between items-center px-6 py-4 w-full text-white bg-transparent z-10 relative">
        <h1 className="text-xl font-bold">Expense Management System</h1>
        <div>
          {user ? (
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
