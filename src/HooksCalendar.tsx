import React, { useEffect, useCallback } from "react";
import moment, { Moment } from "moment";
import CalendarCSS from "./HooksCalendar.module.css";
import Calendar from "./Components/Calendar";
import {
  CalendarAction,
  CalendarActionTypes
} from "./ActionCreators/CalendarActions";
import CalendarContext from "./Context/CalendarContext";
import Plus from "../src/resources/icons/Plus";
import AppointmentEditorView from "../src/Components/AppointmentEditor";
import * as CalendarActions from "./ActionCreators/CalendarActions";
import { AppointmentActionTypes } from "./ActionCreators/AppointmentActions";

export type CalendarState = {
  currentMonth: moment.Moment;
  currentDate: moment.Moment;
  selectedDay: moment.Moment | null;
  days: Array<HTMLElement>;
  demoSideEffect: string;
  isAddAppointmentModalVisible: boolean;
  appointments: Array<Appointment>;
  currentAppointment: Appointment;
};

export type Appointment = {
  appointmentTitle: string;
  appointmentStart: string;
  appointmentEnd: string;
};

export const defaultCalendarState = {
  currentMonth: moment(),
  currentDate: moment(),
  selectedDay: null,
  days: [],
  demoSideEffect: "notDone!",
  isAddAppointmentModalVisible: false,
  appointments: [],
  currentAppointment: {
    appointmentTitle: "",
    appointmentStart: "",
    appointmentEnd: ""
  }
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
      setTimeout(
        dispatch,
        5000,
        new CalendarActions.ReturnDemoSideEffect("DID IT")
      );
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
    case CalendarActionTypes.HIDE_ADD_APPOINTMENT_MODAL:
    case CalendarActionTypes.SHOW_ADD_APPOINTMENT_MODAL:
    case AppointmentActionTypes.UPDATE_TITLE:
      return AppointmentReducer(state, action);
    default:
      return state;
  }
};

const AppointmentReducer = (state: CalendarState, action: CalendarAction) => {
  switch (action.type) {
    case CalendarActionTypes.SHOW_ADD_APPOINTMENT_MODAL:
      return { ...state, isAddAppointmentModalVisible: true };
    case CalendarActionTypes.HIDE_ADD_APPOINTMENT_MODAL:
      return { ...state, isAddAppointmentModalVisible: false };
    case AppointmentActionTypes.UPDATE_TITLE:
      return {
        ...state,
        currentAppointment: {
          ...state.currentAppointment,
          appointmentTitle: action.payload
        }
      };
    case AppointmentActionTypes.UPDATE_START:
      return {
        ...state,
        currentAppointment: {
          ...state.currentAppointment,
          appointmentStart: action.payload
        }
      };
    case AppointmentActionTypes.UPDATE_END:
      return {
        ...state,
        currentAppointment: {
          ...state.currentAppointment,
          appointmentEnd: action.payload
        }
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
        <div className={CalendarCSS.innerContainer}>
          {calendarState.demoSideEffect}
          <Calendar />
        </div>
        <AddAppointmentButton />
        <AppointmentEditorView />
      </div>
    </CalendarContext.Provider>
  );
}

function AddAppointmentButton() {
  const calendarContext = React.useContext(CalendarContext);
  return (
    <div
      className={CalendarCSS.plus}
      role='button'
      onClick={React.useCallback(() => {
        calendarContext.dispatch(new CalendarActions.ShowAddAppointmentModal());
      }, [])}
    >
      <Plus />
    </div>
  );
}

export default HooksCalendar;
