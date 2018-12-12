import React from "react";
import CalendarCSS from "../HooksCalendar.module.css";
import classnames from "classnames";
import DayAbbreviations from "./DayAbbreviations";
import Day from "./Day";
import CalendarContext from "../Context/CalendarContext";
import * as CalendarActions from "../CalendarActions";
import moment from "moment";

function Calendar(): JSX.Element {
  const calendarContext = React.useContext(CalendarContext);

  const advanceMonth = (): void => {
    calendarContext.dispatch(new CalendarActions.IncrementMonth());
  };

  const decrementMonth = (): void => {
    calendarContext.dispatch(new CalendarActions.DecrementMonth());
  };

  const renderDays = (): Array<JSX.Element> => {
    const {
      currentMonth,
      selectedDay,
      currentDate
    } = calendarContext.calendarState;
    const monthStart = moment(currentMonth).startOf("month");
    const monthEnd = moment(monthStart).endOf("month");
    const startDate = moment(monthStart).startOf("week");
    const endDate = moment(monthEnd).endOf("week");

    const rows: Array<JSX.Element> = [];

    let days: Array<JSX.Element> = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = day.clone().format("D");
        const isDayOutOfSelectedMonth = !moment(day).isSame(
          monthStart,
          "month"
        );
        const isCurrentDay = moment(day)
          .startOf("day")
          .isSame(moment(currentDate).startOf("day"));

        days.push(
          <Day
            key={moment(day).format("MM-DD-YYYY")}
            moment={moment(day)}
            dayOfMonth={+formattedDate}
            isDayOutOfSelectedMonth={isDayOutOfSelectedMonth}
            isCurrentDay={isCurrentDay}
            isSelectedDay={
              selectedDay != null
                ? moment(day).isSame(moment(selectedDay))
                : false
            }
          />
        );
        day = day.add(1, "day");
      }
      rows.push(
        <div
          key={moment(day).format("MM-DD")}
          className={CalendarCSS.weekContainer}
        >
          {days}
        </div>
      );
      days = [];
    }
    return rows;
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
          {moment(calendarContext.calendarState.currentMonth).format(
            "MMMM YYYY"
          )}
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
      {renderDays()}
    </div>
  );
}

export default Calendar;
