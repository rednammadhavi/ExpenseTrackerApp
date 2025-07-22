import React from 'react';
import logo from "../assets/loader.gif";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-[300px] mt-20 z-20 relative">
      <img src={logo} alt="loading" width="250px" height="250px" />
    </div>
  );
};

export default Spinner;
