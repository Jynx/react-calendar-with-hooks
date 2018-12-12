import React from "react";
import CalendarCSS from "../HooksCalendar.module.css";
import CalendarContext from "../Context/CalendarContext";
import moment from "moment";

function DayAbbreviations(): JSX.Element {
  const calendarContext = React.useContext(CalendarContext);

  const generateDayAbbreviations = (): Array<string> => {
    let daysOfWeek = [];
    let startDate = moment(calendarContext.calendarState.currentDate).startOf(
      "month"
    );
    for (let i = 0; i < 7; i++) {
      daysOfWeek.push(
        startDate
          .add(1, "days")
          .format("dddd")
          .substr(0, 2)
      );
    }
    return daysOfWeek;
  };

  return (
    <div className={CalendarCSS.abbrContent}>
      {generateDayAbbreviations().map(abbr => (
        <div key={abbr} className={CalendarCSS.abbr}>
          {abbr}
        </div>
      ))}
    </div>
  );
}

export default DayAbbreviations;
