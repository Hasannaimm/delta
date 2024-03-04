import React from "react";
import { MainColor } from "../utils";

type ButtonProps = {
  children: React.ReactNode;
  classes?: string;
};

const Button = ({ children, classes }: ButtonProps) => {
  return (
    <button
      className={`${MainColor} p-4 ${classes} text-[#b2c83f]  max-sm:p-2  hover:bg-white transform transition border-[#b2c83f] border-2 text-sm  w7 -translate-x-[50%] z-50`}
    >
      {children}
    </button>
  );
};

export default Button;
