import React from "react";
import moment, { Moment } from "moment";
import classnames from "classnames";
import Calendar from "./HooksCalendar.module.css";
import { CalendarAction, CalendarActionTypes } from "./CalendarActions";

type CalendarData = {
  date: moment.Moment;
  days: Array<HTMLElement>;
};

const CalendarReducer = (state: CalendarData, action: CalendarAction) => {
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

type CalendarContext = {
  dispatch: (action: CalendarAction) => {};
  date: moment.Moment;
};

const CalendarContextDefault = {
  dispatch: (action: CalendarAction) => {},
  date: moment()
};

const CalendarContext = React.createContext(CalendarContextDefault);

function HooksCalendar(): JSX.Element {
  const [calendarState, dispatch] = React.useReducer(CalendarReducer, {
    date: moment(),
    days: []
  });

  return (
    <CalendarContext.Provider
      value={{ dispatch: dispatch, date: calendarState.date }}
    >
      <div className={Calendar.mainContainer}>
        <div className={Calendar.innerContainer} />
        <CalendarView />
      </div>
    </CalendarContext.Provider>
  );
}

function CalendarView(): JSX.Element {
  const calendarContext = React.useContext(CalendarContext);

  const advanceMonth = (): void => {
    calendarContext.dispatch({
      type: CalendarActionTypes.INCREMENT_MONTH,
      payload: {
        date: calendarContext.date
      }
    });
  };

  const decrementMonth = (): void => {
    calendarContext.dispatch({
      type: CalendarActionTypes.DECREMENT_MONTH,
      payload: {
        date: calendarContext.date
      }
    });
  };

  return (
    <div className={Calendar.content}>
      <div className={Calendar.header}>
        <div
          className={classnames(
            Calendar.chevron,
            Calendar.chevronLeft,
            Calendar.left
          )}
          onClick={advanceMonth}
        />
        <div className={Calendar.headerText}>
          {calendarContext.date.startOf("month").format("MMMM")}
        </div>
        <div
          className={classnames(
            Calendar.chevron,
            Calendar.chevronRight,
            Calendar.right
          )}
          onClick={decrementMonth}
        />
      </div>
      {/* <DayAbbreviations /> */}
      {/* <div className={styles.weekContainer}>
        {props.weekIds
          ? props.weekIds.map(id => <Week key={id} weekId={id} />)
          : null}
      </div> */}
    </div>
  );
}

export default HooksCalendar;
