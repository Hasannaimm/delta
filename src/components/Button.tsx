import React from "react";
import { MainColor } from "../utils";

type ButtonProps = {
  children: React.ReactNode;
  classes?: string;
};

const Button = ({ children, classes }: ButtonProps) => {
  return (
    <button
      className={`${MainColor} p-4 bg-[#334774] text-white ${classes} hover:text-[#334774] hover:bg-white transform transition border-[#334774] border-2 text-sm  -translate-x-[50%] z-50`}
    >
      {children}
    </button>
  );
};

export default Button;
