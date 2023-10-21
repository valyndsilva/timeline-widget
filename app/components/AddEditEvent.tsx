import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WidgetContext from "@/context/widgetContext";

type Props = {
  onAddEvent: (eventData: EventData) => void;
  onEditEvent: (eventData: EventData) => void;
  eventToEdit: EventData | null;
};

export default function AddEditEvent({
  onAddEvent,
  onEditEvent,
  eventToEdit,
}: Props) {
  const { events, setEvents, editSectionRef } = useContext(WidgetContext);
  const [isEditing, setIsEditing] = useState(false);
  // Initialize a counter for auto-generating IDs
  const [idCounter, setIdCounter] = useState(1);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventImgUrl, setNewEventImgUrl] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // State variables to store the editing values
  const [editEventId, setEditEventId] = useState<number | null>(null);
  const [editEventTitle, setEditEventTitle] = useState(
    eventToEdit?.title || ""
  );
  const [editEventDescription, setEditEventDescription] = useState<
    string | undefined
  >(eventToEdit?.desc || "");
  const [editEventImgUrl, setEditEventImgUrl] = useState<string | undefined>(
    eventToEdit?.imgUrl || ""
  );
  // Define state variable for managing the open/close state of "Add Event"
  const [isEventOpen, setIsEventOpen] = useState(true);

  // Listen to changes in the eventToEdit prop
  useEffect(() => {
    if (eventToEdit) {
      // Update the state with the event details
      setEditEventId(eventToEdit.id);
      setEditEventTitle(eventToEdit.title);
      setEditEventDescription(eventToEdit.desc);
      setEditEventImgUrl(eventToEdit.imgUrl);
      setIsChecked(eventToEdit.isChecked);
      setIsEditing(true);
    } else {
      // Clear the editing state if eventToEdit is null
      setEditEventId(null);
      setEditEventTitle("");
      setEditEventDescription("");
      setEditEventImgUrl("");
      setIsChecked(false);
      setIsEditing(false);
    }
  }, [eventToEdit]);

  // Function to toggle the "Add / Edit Event" section
  const toggleEvent = () => {
    setIsEventOpen((prev) => !prev);
    setIsEditing(false);
  };

  const handleAddEvent = () => {
    // if (newEventTitle.trim() === "") {
    //   // You can add validation or show an error message if title is required
    //   return;
    // }

    // Generate a new ID using the counter
    const newEventId = idCounter;

    const eventData: EventData = {
      id: newEventId, // Assign the generated ID
      title: newEventTitle,
      desc: newEventDescription,
      imgUrl: newEventImgUrl,
      isChecked: isChecked,
    };

    // Increment the counter for the next event
    setIdCounter(idCounter + 1);

    onAddEvent(eventData);

    if (eventData) {
      toast.success("Timeline event added!");
    } else {
      toast.error("Error adding Timeline event!");
    }
    // Clear the input fields after adding the event
    setNewEventTitle("");
    setNewEventDescription("");
    setNewEventImgUrl("");
    setIsChecked(false);
  };

  const handleEditEvent = (eventId: number) => {
    setIsEditing(true);
    setIsEventOpen(true);
    const updatedEvents = [...events];

    // Find the index of the event with the matching eventId
    const index = updatedEvents.findIndex((event) => event.id === eventId);

    if (index !== -1) {
      // Update the isChecked property of the event
      updatedEvents[index].isChecked = !updatedEvents[index].isChecked;
      setEvents(updatedEvents);

      if (!editEventId) return;
      const updatedEvent = {
        id: editEventId,
        title: editEventTitle,
        desc: editEventDescription,
        imgUrl: editEventImgUrl,
        isChecked: isChecked,
      };

      onEditEvent(updatedEvent);

      if (updatedEvent) {
        toast.success("Timeline event updated!");
      } else {
        toast.error("Error updating Timeline event!");
      }
      // Clear the editing state
      setEditEventId(null);
      setEditEventTitle("");
      setEditEventDescription("");
      setEditEventImgUrl("");
      setIsChecked(false);
      // Close the editing section
      setIsEditing(false);
    } else {
      console.error("Event with eventId not found.");
    }
  };

  return (
    <div className={`w-full ${!isEventOpen && "border-b pb-3"}`}>
      <div
        onClick={toggleEvent}
        className={`flex justify-between items-center font-medium cursor-pointer list-none`}
      >
        <span>{isEditing ? "Edit Timeline event" : "Add a Timeline Event"}</span>
        <span
          className={`transition  border rounded-full ${
            isEventOpen ? "rotate-180" : ""
          }`}
        >
          <KeyboardArrowDownIcon />
        </span>
      </div>
      {isEventOpen && (
        <div
          ref={editSectionRef}
          className="w-full flex flex-col justify-center items-center mt-4 border-2 rounded-md p-4 space-y-4 transform transition-all duration-300 ease-in"
        >
          {/* Title */}
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="title" className="text-sm">
              Title:
            </label>
            <input
              id="title"
              className="w-full p-2 rounded-md border text-sm"
              type="text"
              placeholder="Add a title..."
              value={isEditing ? editEventTitle : newEventTitle}
              onChange={(e) =>
                isEditing
                  ? setEditEventTitle(e.target.value)
                  : setNewEventTitle(e.target.value)
              }
              required
            />
          </div>
          {/* Description */}
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="description" className="text-sm">
              Description:
            </label>
            <textarea
              id="description"
              className="w-full p-2 rounded-md border text-sm"
              placeholder="Add a description..."
              value={isEditing ? editEventDescription : newEventDescription}
              onChange={(e) =>
                isEditing
                  ? setEditEventDescription(e.target.value)
                  : setNewEventDescription(e.target.value)
              }
            />
          </div>
          {/* Media Url */}
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="imgUrl" className="text-sm">
              Media URL:
            </label>
            <input
              id="imgUrl"
              className="w-full p-2 rounded-md border text-sm"
              type="text"
              placeholder="Add a Media URL..."
              value={isEditing ? editEventImgUrl : newEventImgUrl}
              onChange={(e) =>
                isEditing
                  ? setEditEventImgUrl(e.target.value)
                  : setNewEventImgUrl(e.target.value)
              }
            />
          </div>
          <div className="flex items-center space-x-2 w-full">
            <span className="text-sm">Marked as completed:</span>
            <input
              className="w-5 h-5"
              type="checkbox"
              checked={isEditing ? isChecked : isChecked}
              onChange={(e) =>
                isEditing
                  ? setIsChecked(e.target.checked)
                  : setIsChecked(e.target.checked)
              }
            />
          </div>
          {isEditing ? (
            <button
              className="w-full border px-4 py-2 bg-gray-100 rounded-md mt-2 cursor-pointer"
              onClick={() => handleEditEvent(editEventId!)}
            >
              Edit Event
            </button>
          ) : (
            <button
              className="w-full border px-4 py-2 bg-gray-100 rounded-md mt-2 cursor-pointer"
              onClick={handleAddEvent}
            >
              Add Event
            </button>
          )}
        </div>
      )}
    </div>
  );
}
