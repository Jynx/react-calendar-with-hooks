import React from "react";
import CalendarCSS from "../HooksCalendar.module.css";
import classnames from "classnames";
import DayAbbreviations from "./DayAbbreviations";
import CalendarContext from "../Context/CalendarContext";
import * as CalendarActions from "../CalendarActions";

function Calendar(): JSX.Element {
  const calendarContext = React.useContext(CalendarContext);

  const advanceMonth = (): void => {
    calendarContext.dispatch(
      new CalendarActions.IncrementMonth(
        calendarContext.calendarState.currentMonth
      )
    );
  };

  const decrementMonth = (): void => {
    calendarContext.dispatch(
      new CalendarActions.DecrementMonth(
        calendarContext.calendarState.currentMonth
      )
    );
  };

  return (
    <div className={CalendarCSS.content}>
      <div className={CalendarCSS.header}>
        <div
          className={classnames(
            CalendarCSS.chevron,
            CalendarCSS.chevronLeft,
            CalendarCSS.lef
          )}
          onClick={decrementMonth}
        />
        <div className={CalendarCSS.headerText}>
          {calendarContext.calendarState.currentMonth.format("MMMM")}
        </div>
        <div
          className={classnames(
            CalendarCSS.chevron,
            CalendarCSS.chevronRight,
            CalendarCSS.right
          )}
          onClick={advanceMonth}
        />
      </div>
      <DayAbbreviations />
      <div className={CalendarCSS.weekContainer}>
        {/* {props.weekIds
          ? props.weekIds.map(id => <Week key={id} weekId={id} />)
          : null} */}
      </div>
    </div>
  );
}

export default Calendar;
