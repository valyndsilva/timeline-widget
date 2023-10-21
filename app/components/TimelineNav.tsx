import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NavButton from "./NavButton";
type Props = {
  isAtStart: boolean;
  isAtEnd: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
};

export default function TimelineNav({
  isAtStart,
  isAtEnd,
  scrollLeft,
  scrollRight,
}: Props) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* Navigation Buttons */}
      <div className="flex">
        <NavButton
          onClick={scrollLeft}
          disabled={isAtStart}
          icon={<ChevronLeftIcon />}
        />
        <NavButton
          onClick={scrollRight}
          disabled={isAtEnd}
          icon={<ChevronRightIcon />}
        />
      </div>
    </div>
  );
}
