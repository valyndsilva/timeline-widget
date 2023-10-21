import WidgetContext from "@/context/widgetContext";
import React, { useContext } from "react";

type Props = { events: EventData[] };

export default function ReorderableList({ events }: Props) {
  const { setEvents } = useContext(WidgetContext);

  // Create references for the dragItem and dragOverItem
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);

  // Function to handle drag and sorting
  const handleSort = () => {
    // Duplicate the items
    const reorderedEvents = [...events];

    // Remove and save the dragged item's content
    const draggedItemContent = reorderedEvents.splice(dragItem.current, 1)[0];

    // Switch the positions
    reorderedEvents.splice(dragOverItem.current, 0, draggedItemContent);

    // Reset the position refs
    dragItem.current = null;
    dragOverItem.current = null;

    // Update the actual array with the new order
    setEvents(reorderedEvents);
  };
  return (
    <div className="flex flex-col mt-5 w-full">
      <div className="font-medium border-b pb-3">Reorder Timeline Events</div>
      {events.length === 0 && (
        <div className="mt-4 text-gray-400">No timeline events addded yet...</div>
      )}
      {events.map((event, index) => (
        <div
          key={event?.id}
          className="flex items-center space-x-2 border border-gray-500 rounded-md p-4 my-2 cursor-pointer"
          draggable
          onDragStart={(e) => (dragItem.current = index)}
          onDragEnter={(e) => (dragOverItem.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >
          <span className="text-sm">{event?.title}</span>
        </div>
      ))}
    </div>
  );
}
