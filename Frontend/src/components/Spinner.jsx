import React from 'react';
import logo from "../assets/loader.gif";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-[300px] sm:h-[250px] xs:h-[200px] mt-10 sm:mt-16 xs:mt-10 z-20 relative px-4">
      <img
        src={logo}
        alt="loading"
        className="w-[150px] sm:w-[200px] md:w-[250px] max-w-full h-auto"
      />
    </div>
  );
};

export default Spinner;
