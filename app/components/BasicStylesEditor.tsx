import WidgetContext from "@/context/widgetContext";
import React, { useContext, useState } from "react";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DoneIcon from "@mui/icons-material/Done";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
type Props = {};

export default function BasicStylesEditor({}: Props) {
  const {
    lineColor,
    setLineColor,
    setChecked,
    setUnchecked,
    setCheckedIcon,
    checkedIconName,
    setCheckedIconName,
    setUncheckedIcon,
    uncheckedIconName,
    setUncheckedIconName,
    checkedColor,
    setCheckedColor,
    uncheckedColor,
    setUncheckedColor,
    textColor,
    setTextColor,
  } = useContext(WidgetContext);

  const [isStylesOpen, setIsStylesOpen] = useState(false);

  // Provide options for Checked Icons
  const checkedIcons = [
    { name: "EventAvailableIcon", icon: <EventAvailableIcon /> },
    { name: "DoneIcon", icon: <DoneIcon /> },
    { name: "ThumbUpOffAltIcon", icon: <ThumbUpOffAltIcon /> },
  ];

  // Provide options for Unchecked Icons
  const uncheckedIcons = [
    { name: "EventBusyIcon", icon: <EventBusyIcon /> },
    { name: "CloseIcon", icon: <CloseIcon /> },
    { name: "ThumbDownOffAltIcon", icon: <ThumbDownOffAltIcon /> },
  ];

  const handleLineColorChange = (newColor: string) => {
    setLineColor(newColor);
  };

  const handleCheckedColorChange = (newColor: string) => {
    setCheckedColor(newColor);
  };

  const handleUncheckedColorChange = (newColor: string) => {
    setUncheckedColor(newColor);
  };

  const handleTextColorChange = (newColor: string) => {
    setTextColor(newColor);
  };

  const handleCheckedIcon = (icon: Icon) => {
    setCheckedIcon(icon.icon);
    setCheckedIconName(icon.name);
    setChecked(true);
    setUnchecked(false);
  };

  const handleUncheckedIcon = (icon: Icon) => {
    setUncheckedIcon(icon.icon);
    setUncheckedIconName(icon.name);
    setChecked(true);
    setUnchecked(false);
  };
  const toggleStyles = () => {
    setIsStylesOpen((prev) => !prev);
  };
  return (
    <div className={`w-full ${!isStylesOpen && "border-b pb-3"}`}>
      <div
        onClick={toggleStyles}
        className={`flex justify-between items-center font-medium cursor-pointer list-none`}
      >
        <span className="font-medium w-full">Basic Styles Editor</span>
        <span className={`transition border rounded-full ${isStylesOpen ? "rotate-180" : ""}`}>
          <KeyboardArrowDownIcon />
        </span>
      </div>
      {isStylesOpen && (
        <div className="w-full flex flex-col mt-4 border-2 rounded-md p-4 space-y-4 transform transition-all duration-300 ease-in">
          <div className="flex space-x-5">
            {/* Central Line Color Editor */}
            <div className="flex items-center space-x-2">
              <span className="text-sm">Central Line Color:</span>
              <input
                type="color"
                value={lineColor}
                onChange={(e) => handleLineColorChange(e.target.value)}
                className="w-8 h-8"
              />
            </div>
            {/* Text Color Editor */}
            <div className="flex items-center space-x-2">
              <span className="text-sm">Text Color:</span>
              <input
                type="color"
                value={textColor}
                onChange={(e) => handleTextColorChange(e.target.value)}
                className="w-8 h-8"
              />
            </div>
          </div>

          {/* Checked Background Color Editor */}
          <div className="flex items-center space-x-2">
            <span className="text-sm">Checked Background Color:</span>
            <input
              type="color"
              value={checkedColor}
              onChange={(e) => handleCheckedColorChange(e.target.value)}
              className="w-8 h-8"
            />
          </div>
          {/* Checked Icon Color Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm">Select Checked Icon:</span>
            <div className="flex space-x-2">
              {checkedIcons.map((icon, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 flex items-center justify-center border p-5 rounded-full text-gray-500 cursor-pointer ${
                    checkedIconName === icon.name
                      ? "bg-gray-500 text-white"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleCheckedIcon(icon)}
                >
                  <span className="">{icon.icon}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Unchecked Background Color Editor */}
          <div className="flex items-center space-x-2">
            <span className="text-sm">Unchecked Background Color:</span>
            <input
              type="color"
              value={uncheckedColor}
              onChange={(e) => handleUncheckedColorChange(e.target.value)}
              className="w-8 h-8"
            />
          </div>
          {/* Unchecked Icon Color Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm">Select Unchecked Icon:</span>
            <div className="flex space-x-2">
              {uncheckedIcons.map((icon, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 items-center flex justify-center border p-5 rounded-full text-gray-500 cursor-pointer ${
                    uncheckedIconName === icon.name
                      ? "bg-gray-500 text-white"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleUncheckedIcon(icon)}
                >
                  {icon.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
