"use client";
import React, { useContext } from "react";
import WidgetContext from "@/context/widgetContext";
import CloseIcon from "@mui/icons-material/Close";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ReorderableList from "./ReorderableList";
import AddEditEvent from "./AddEditEvent";
import BasicStylesEditor from "./BasicStylesEditor";

type Props = {
  onAddEvent: (eventData: EventData) => void;
  onEditEvent: (eventData: EventData) => void;
  eventToEdit: EventData | null;
};

export default function TimelineEditor({
  onAddEvent,
  onEditEvent,
  eventToEdit,
}: Props) {
  const { isSidebarOpen, setIsSidebarOpen, events } = useContext(WidgetContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`flex flex-col space-x-4 relative w-full sm:p-4 ${
        isSidebarOpen && " border border-gray-200 sm:h-[100vh] overflow-y-auto"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className={`${
          isSidebarOpen && ""
        } right-4 sm:absolute border border-gray-200 rounded-md p-4 sm:mb-0`}
      >
        {isSidebarOpen ? (
          <CloseIcon className="" />
        ) : (
          <AutoFixHighIcon className="" />
        )}
      </button>

      {isSidebarOpen && (
        <div className="timeline-editor-sidebar mt-5 sm:mt-20 sm:w-96">
          <div className="flex flex-col items-start space-y-4 pr-4">
            <BasicStylesEditor />

            <div className="space-y-5 w-full">
              <AddEditEvent
                eventToEdit={eventToEdit}
                onAddEvent={onAddEvent}
                onEditEvent={onEditEvent}
              />
            </div>
            <ReorderableList events={events} />
          </div>
        </div>
      )}
    </div>
  );
}
