import React from "react";

import { IoEye, IoEyeOff } from "react-icons/io5";

interface props {
  isVisible: boolean;
  toggleVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

function PasswordButton({ isVisible, toggleVisibility }: props) {
  return (
    <button
      className="focus:outline-none self-center"
      type="button"
      onClick={() => {
        toggleVisibility(!isVisible);
      }}
    >
      {isVisible ? (
        <IoEye className="text-2xl text-default-400 pointer-events-none" />
      ) : (
        <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
      )}
    </button>
  );
}

export default PasswordButton;
