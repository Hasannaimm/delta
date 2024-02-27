import React from "react";
import { MainColor } from "../utils";

type ButtonProps = {
  children: React.ReactNode;
  classes?: string;
};

const Button = ({ children, classes }: ButtonProps) => {
  return (
    <button
      className={`${MainColor} p-4 ${classes} text-[#334774]  max-sm:p-2  hover:bg-white transform transition border-[#334774] border-2 text-sm  w7 -translate-x-[50%] z-50`}
    >
      {children}
    </button>
  );
};

export default Button;
