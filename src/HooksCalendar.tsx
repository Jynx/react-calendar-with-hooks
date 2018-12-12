import React, { useEffect } from "react";
import moment, { Moment } from "moment";
import CalendarCSS from "./HooksCalendar.module.css";
import Calendar from "./Components/Calendar";
import { CalendarAction, CalendarActionTypes } from "./CalendarActions";
import CalendarContext from "./Context/CalendarContext";
import Plus from "../src/resources/icons/Plus";
import AppointmentEditorView from "../src/Components/AppointmentEditor";
import * as CalendarActions from "../src/CalendarActions";

export type CalendarState = {
  currentMonth: moment.Moment;
  currentDate: moment.Moment;
  selectedDay: moment.Moment | null;
  days: Array<HTMLElement>;
  demoSideEffect: string;
};

export const defaultCalendarState = {
  currentMonth: moment(),
  currentDate: moment(),
  selectedDay: null,
  days: [],
  demoSideEffect: "notDone!"
};

function useCalendarReducer(
  reducer: React.Reducer<CalendarState, CalendarAction>,
  initialState: CalendarState
): [CalendarState, React.Dispatch<CalendarAction>] {
  const [state, setState] = React.useState(initialState);

  function dispatch(action: CalendarAction) {
    const nextState = reducer(state, action);
    const setStatePromise = new Promise<CalendarAction>((resolve, reject) => {
      setState(nextState);
      resolve(action);
    });
    setStatePromise.then((action: CalendarAction) => {
      runSideEffects(action, state, dispatch);
    });
  }
  return [state, dispatch];
}

const runSideEffects = (
  action: CalendarAction,
  state: CalendarState,
  dispatch: React.Dispatch<CalendarAction>
) => {
  switch (action.type) {
    case CalendarActionTypes.INCREMENT_MONTH:
      debugger;
      dispatch(new CalendarActions.ReturnDemoSideEffect("DID IT"));
      break;
  }
};

const CalendarReducer = (state: CalendarState, action: CalendarAction) => {
  debugger;
  switch (action.type) {
    case CalendarActionTypes.INCREMENT_MONTH:
      return {
        ...state,
        currentMonth: state.currentMonth.add(1, "months")
      };
    case CalendarActionTypes.DECREMENT_MONTH:
      return {
        ...state,
        currentMonth: state.currentMonth.subtract(1, "months")
      };
    case CalendarActionTypes.SET_SELECTED_DAY:
      return {
        ...state,
        selectedDay: action.payload
      };
    case CalendarActionTypes.RUN_DEMO_SIDE_EFFECT:
      return {
        ...state,
        demoSideEffect: action.payload
      };
    default:
      return state;
  }
};

function HooksCalendar() {
  const [calendarState, dispatch] = useCalendarReducer(
    CalendarReducer,
    defaultCalendarState
  );

  return (
    <CalendarContext.Provider value={{ dispatch, calendarState }}>
      <div className={CalendarCSS.mainContainer}>
        <div className={CalendarCSS.innerContainer} />
        {calendarState.demoSideEffect}
        <Calendar />
        {/* <AppointmentEditorView /> */}
        <AddAppointmentView />
      </div>
    </CalendarContext.Provider>
  );
}

const AddAppointmentView = () => (
  <div className={CalendarCSS.plus}>
    <Plus />
  </div>
);

export default HooksCalendar;
