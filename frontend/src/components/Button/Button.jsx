// Button.js
import React from "react";

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
