"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import WidgetContext from "@/context/widgetContext";
import TimelineEvent from "./TimelineEvent";
import TimelineNav from "./TimelineNav";
import TimelineEditor from "./TimelineEditor";

export default function Timeline() {

  // Ref to the timeline container
  const containerRef = useRef<HTMLOListElement | null>(null);

  // State variables for scroll position and navigation
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isAtStart, setIsAtStart] = useState<boolean>(true);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);

  // State for event editing
  const [eventToEdit, setEventToEdit] = useState<EventData | null>(null);

  // Get events, set events and line color from context
  const { events, setEvents, lineColor } = useContext(WidgetContext);

  // Effect to update navigation and scroll position
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const atStart = container.scrollLeft === 0;
      const atEnd =
        container.scrollLeft + container.clientWidth >= container.scrollWidth;

      setIsAtStart(atStart);
      setIsAtEnd(atEnd);
      setScrollPosition(container.scrollLeft);
    }
  }, [scrollPosition]);

  // Function to scroll the timeline
  const scroll = (offset: number) => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollTo({
        left: container.scrollLeft + offset,
        behavior: "smooth",
      });
    }
  };

  // Function to scroll to the left
  const scrollLeft = () => {
    scroll(-350); // Adjust the scroll amount as needed
  };

  // Function to scroll to the right
  const scrollRight = () => {
    scroll(350); // Adjust the scroll amount as needed
  };

  // Function to add a new event
  const addEvent = (eventData: EventData) => {
    setEvents([...events, eventData]);
  };

  // Function to edit an existing event
  const editEvent = (updatedEventData: EventData) => {
    const updatedEvents = [...events];
    const index = events.findIndex((event) => event.id === updatedEventData.id);
    updatedEvents[index] = updatedEventData;
    setEvents(updatedEvents);
    setEventToEdit(null);
  };

  // Function to delete an event
  const deleteEvent = (eventIndex: number) => {
    const updatedEvents = events.filter((_, index) => index !== eventIndex);
    setEvents(updatedEvents);
    setEventToEdit(null);
  };

  // Function to handle marking an event as complete or incomplete
  const handlePointClick = async (eventIndex: number) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].isChecked = !updatedEvents[eventIndex].isChecked;
    setEvents(updatedEvents);
    if (updatedEvents[eventIndex].isChecked) {
      toast.success("Timeline event is marked complete!");
    } else {
      toast.error("Timeline event is marked incomplete!");
    }
  };

  return (
    <div className="timeline flex relative w-full space-x-4 items-center justify-center">
      {/* Timeline Content */}
      <div className="h-fit sm:min-h-screen flex flex-col w-full p-4 lg:px-8 lg:py-4 space-y-4 sm:space-y-0 overflow-x-auto no-scrollbar ">
        {events.length > 0 ? (
          <>
            <ol
              className="items-center  sm:flex overflow-x-auto no-scrollbar w-full sm:p-6 border-l-2 sm:border-2 sm:rounded-md"
              ref={containerRef}
              onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
            >
              {events.map((event, index) => (
                <TimelineEvent
                  key={index}
                  event={event}
                  index={index}
                  onEdit={() => setEventToEdit(event)}
                  onDelete={() => deleteEvent(index)}
                  handlePointClick={() => handlePointClick(index)}
                />
              ))}
            </ol>
            <TimelineNav
              isAtStart={isAtStart}
              isAtEnd={isAtEnd}
              scrollLeft={scrollLeft}
              scrollRight={scrollRight}
            />
          </>
        ) : (
          <div className="border border-gray-200 p-4 text-center">
            No events added yet...
          </div>
        )}
        {/* Timeline Editor */}
        <div className="flex sm:hidden">
          <TimelineEditor
            onAddEvent={addEvent}
            onEditEvent={editEvent}
            eventToEdit={eventToEdit}
          />
        </div>
      </div>
      {/* Timeline Editor */}
      <div className="hidden sm:flex min-h-screen">
        <TimelineEditor
          onAddEvent={addEvent}
          onEditEvent={editEvent}
          eventToEdit={eventToEdit}
        />
      </div>
    </div>
  );
}
