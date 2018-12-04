import React from "react";
import moment, { Moment } from "moment";
import CalendarCSS from "./HooksCalendar.module.css";
import Calendar from "./Components/Calendar";
import { CalendarAction, CalendarActionTypes } from "./CalendarActions";
import CalendarContext from "./Context/CalendarContext";

export type CalendarState = {
  currentMonth: number;
  date: moment.Moment;
  days: Array<HTMLElement>;
};

export const defaultCalendarState = {
  currentMonth: 0,
  date: moment(),
  days: []
};

const CalendarReducer = (state: CalendarState, action: CalendarAction) => {
  switch (action.type) {
    case CalendarActionTypes.INCREMENT_MONTH:
      return {
        ...state,
        date: state.date.add(1, "months")
      };
    case CalendarActionTypes.DECREMENT_MONTH:
      return {
        ...state,
        date: state.date.subtract(1, "months")
      };
    default:
      return state;
  }
};

function HooksCalendar(): JSX.Element {
  const [calendarState, dispatch] = React.useReducer(
    CalendarReducer,
    defaultCalendarState
  );

  return (
    <CalendarContext.Provider
      value={{ dispatch: dispatch, calendarState: calendarState }}
    >
      <div className={CalendarCSS.mainContainer}>
        <div className={CalendarCSS.innerContainer} />
        <Calendar />
      </div>
    </CalendarContext.Provider>
  );
}

export default HooksCalendar;
