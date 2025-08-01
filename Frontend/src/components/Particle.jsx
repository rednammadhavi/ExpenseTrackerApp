import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Particle = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative w-full h-[100vh] sm:h-[80vh] md:h-[100vh] overflow-hidden">
      <Particles
        id="firefly-particles"
        init={particlesInit}
        className="absolute inset-0"
        options={{
          fullScreen: { enable: false },
          background: { color: { value: '#000' } },
          fpsLimit: 60,
          particles: {
            number: {
              value: 100,
              density: { enable: true, value_area: 800 },
            },
            color: { value: '#ffcc00' },
            shape: { type: 'circle' },
            opacity: {
              value: 0.5,
              random: true,
            },
            size: {
              value: 3,
              random: { enable: true, minimumValue: 1 },
            },
            links: { enable: false },
            move: {
              enable: true,
              speed: 1,
              outModes: { default: 'out' },
            },
            life: {
              duration: { value: 3 },
              count: 0,
              delay: {
                value: 1,
                random: { enable: true, minimumValue: 0.5 },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Particle;
