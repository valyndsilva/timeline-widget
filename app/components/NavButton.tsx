import React from "react";

type Props = {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
};

export default function NavButton({ onClick, disabled, icon }: Props) {
  return (
    <button
      className={`hidden sm:inline-block mt-5 transform w-10 h-10 mx-5 border border-gray-500 rounded-full bg-white ${
        disabled && "opacity-50 cursor-not-allowed"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
}
