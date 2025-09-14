import React, { type ReactNode } from "react";
import styles from "./Button.module.css";
const Button: React.FC<{
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: string;
}> = ({ children, onClick, type }) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
};

export default Button;
