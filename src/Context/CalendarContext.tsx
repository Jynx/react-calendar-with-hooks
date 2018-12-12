import React from "react";
import { CalendarAction } from "../ActionCreators/CalendarActions";
import { CalendarState } from "../HooksCalendar";
import { defaultCalendarState } from "../HooksCalendar";

export type CalendarContextProps = {
  calendarState: CalendarState;
  dispatch: (action: CalendarAction) => void;
};

const calendarContextDefault = {
  dispatch: () => {},
  calendarState: defaultCalendarState
};

const CalendarContext = React.createContext<CalendarContextProps>(
  calendarContextDefault
);

export default CalendarContext;
