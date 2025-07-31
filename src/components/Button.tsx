import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  color?: "primary" | "danger" | "secondary";
}

const Button = ({ children, onClick, color = "primary" }: ButtonProps) => {
  return (
    <button type="button" className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
