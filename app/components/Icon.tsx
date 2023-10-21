import React, { useContext } from "react";
import WidgetContext from "@/context/widgetContext";

type Props = {
  handlePointClick: () => void;
  isChecked: boolean;
};

export default function Icon({ handlePointClick, isChecked }: Props) {
  const { checkedColor, uncheckedColor, checkedIcon, uncheckedIcon } =
    useContext(WidgetContext);

  return (
    <div
      className="z-10 absolute left-0 sm:-left-[15px] sm:static flex items-center justify-center w-10 h-10 rounded-full shrink-0 text-white"
      style={{
        backgroundColor: isChecked ? checkedColor : uncheckedColor,
      }}
      onClick={handlePointClick}
    >
      {isChecked ? checkedIcon : uncheckedIcon}
    </div>
  );
}
