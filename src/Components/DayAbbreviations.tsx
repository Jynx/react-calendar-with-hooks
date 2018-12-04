import React from "react";
import CalendarCSS from "../HooksCalendar.module.css";
import CalendarContext from "../Context/CalendarContext";

function DayAbbreviations(): JSX.Element {
  const calendarContext = React.useContext(CalendarContext);

  const generateDayAbbreviations = (): Array<string> => {
    let daysOfWeek = [];
    let startDate = calendarContext.calendarState.date.startOf("week");
    for (let i = 1; i < 7; i++) {
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
