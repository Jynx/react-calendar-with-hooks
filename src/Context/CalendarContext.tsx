import React from "react";
import { CalendarAction } from "../CalendarActions";
import { CalendarState } from "../HooksCalendar";
import { defaultCalendarState } from "../HooksCalendar";

export type CalendarContextProps = {
  dispatch: (action: CalendarAction) => void;
  calendarState: CalendarState;
};

const calendarContextDefault = {
  dispatch: () => {},
  calendarState: defaultCalendarState
};

const CalendarContext = React.createContext<CalendarContextProps>(
  calendarContextDefault
);

export default CalendarContext;
