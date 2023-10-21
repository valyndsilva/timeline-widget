"use client";
import React, { useContext, useRef } from "react";
import Icon from "./Icon";
import CentralLine from "./CentralLine";
import WidgetContext from "@/context/widgetContext";

type Props = {
  event: EventData; // Event data to prefill the edit section
  index: number;
  onEdit: (editedEvent: EventData) => void;
  onDelete: () => void;
  handlePointClick: () => void;
};

export default function TimelineEvent({
  event,
  index,
  onEdit,
  onDelete,
  handlePointClick,
}: Props) {
  // Use WidgetContext to access lineColor and textColor
  const { lineColor, textColor, editSectionRef } = useContext(WidgetContext);

  const handleEditClick = (event: EventData) => {

    //Scroll to the "Edit Event" section when clicking "Edit" on mobile
    if (editSectionRef.current) {
      editSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    onEdit(event);
  };

  return (
    <li className="sm:flex sm:flex-col mb-10 ml-10 sm:mb-0 sm:ml-0 w-96 bg-white cursor-pointer">
      <h4 className="mb-3">
        {event?.title ? event?.title : " Add an event title here..."}
      </h4>

      <div className="flex items-center">
        <Icon
          handlePointClick={handlePointClick}
          isChecked={event?.isChecked}
        />
        <CentralLine color={lineColor} />
      </div>

      <div className="group mt-5 bg-white border border-gray-300 p-4 rounded-md w-80 mx-6 transition-all duration-200 hover:ease-in-out sm:hover:scale-105 hover:border-gray-400 cursor-pointer">
        <p
          className="line-clamp-6 mb-2 text-base font-normal text-gray-500"
          style={{ color: textColor }}
        >
          {event?.desc ? event?.desc : " Add an event description here..."}
        </p>

        <img
          src={event?.imgUrl ? event?.imgUrl : "/no-image.png"}
          alt={event?.title}
          className="w-full h-60 object-cover"
        />

        <div className="flex space-x-4 text-gray-800">
          <button
            onClick={() => handleEditClick(event)}
            className="w-full border px-4 py-2 bg-gray-100 rounded-md mt-2 cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete()}
            className="w-full border px-4 py-2 bg-gray-100 rounded-md mt-2 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
