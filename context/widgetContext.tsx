import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";

import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
interface WidgetProviderProps {
  children: ReactNode;
}
interface Widget {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  lineColor: any;
  setLineColor: (lineColor: any) => void;
  checkedColor: any;
  setCheckedColor: (checkedColor: any) => void;
  uncheckedColor: any;
  setUncheckedColor: (uncheckedColor: any) => void;
  checked: any;
  setChecked: (checked: any) => void;
  unchecked: any;
  setUnchecked: (unchecked: any) => void;
  checkedIcon: any;
  setCheckedIcon: (checkedIcon: any) => void;
  checkedIconName: any;
  setCheckedIconName: (checkedIconName: any) => void;
  uncheckedIcon: any;
  setUncheckedIcon: (uncheckedIcon: any) => void;
  uncheckedIconName: any;
  setUncheckedIconName: (uncheckedIconName: any) => void;
  textColor: any;
  setTextColor: (textColor: any) => void;
  events: EventData[];
  setEvents: (events: EventData[]) => void;
  editSectionRef: any;
}
// create context
const WidgetContext = createContext<Widget>({} as Widget);

// provider components
export const WidgetProvider = ({ children }: WidgetProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const defaultColor = "#000000";
  const [lineColor, setLineColor] = useState(defaultColor);
  const [checkedColor, setCheckedColor] = useState("#85E59C");
  const [uncheckedColor, setUncheckedColor] = useState("#EC9292");
  const [textColor, setTextColor] = useState("#cccccc");
  const [checked, setChecked] = useState<boolean>(false);
  const [unchecked, setUnchecked] = useState<boolean>(false);
  const [checkedIcon, setCheckedIcon] = useState(<EventAvailableIcon />);
  const [checkedIconName, setCheckedIconName] = useState("EventAvailableIcon");
  const [uncheckedIcon, setUncheckedIcon] = useState(<EventBusyIcon />);
  const [uncheckedIconName, setUncheckedIconName] = useState("EventBusyIcon");
  const [events, setEvents] = useState<Array<EventData>>([]);

  const editSectionRef = useRef<HTMLDivElement | null>(null); // Create a ref for the "Edit Event" section
  return (
    <WidgetContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        lineColor,
        setLineColor,
        checkedColor,
        setCheckedColor,
        uncheckedColor,
        setUncheckedColor,
        checked,
        setChecked,
        unchecked,
        setUnchecked,
        checkedIcon,
        setCheckedIcon,
        checkedIconName,
        setCheckedIconName,
        uncheckedIcon,
        setUncheckedIcon,
        uncheckedIconName,
        setUncheckedIconName,
        textColor,
        setTextColor,
        events,
        setEvents,
        editSectionRef,
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
};

export default WidgetContext;
