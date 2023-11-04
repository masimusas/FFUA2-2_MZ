// Button.jsx
import React from "react";
import "./Button.css";

const Button = ({ type, onClick, children, linkTo }) => {
  const buttonProps = {
    onClick,
  };

  if (type === "link") {
    return (
      <a href={linkTo} {...buttonProps}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
