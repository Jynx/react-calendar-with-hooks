import React from "react";
import CalendarCSS from "../HooksCalendar.module.css";
import classnames from "classnames";
import CalendarContext from "../Context/CalendarContext";
import * as CalendarActions from "../CalendarActions";
import moment from "moment";

type DayProps = {
  isDayOutOfSelectedMonth: boolean;
  isCurrentDay: boolean;
  isSelectedDay: boolean;
  dayOfMonth: number;
  moment: moment.Moment;
};

function Day(props: DayProps) {
  const backgroundClasses = classnames({
    [CalendarCSS.dayContent]: true,
    [CalendarCSS.dayOutOfMonth]: props.isDayOutOfSelectedMonth
  });

  const dayClasses = classnames({
    [CalendarCSS.day]: true,
    [CalendarCSS.dayCurrent]: props.isCurrentDay,
    [CalendarCSS.daySelected]: props.isSelectedDay
  });

  const onDayselected = () => {
    calendarContext.dispatch(new CalendarActions.SetSelectedDay(props.moment));
  };

  const calendarContext = React.useContext(CalendarContext);
  return (
    <div className={backgroundClasses}>
      <div className={dayClasses} onClick={onDayselected}>
        {props.dayOfMonth}
      </div>
      {/* {props.hasAppointment ? <div className={styles.hasAppointment} /> : null} */}
    </div>
  );
}

export default Day;
