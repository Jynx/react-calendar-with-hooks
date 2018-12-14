import * as React from "react";
import Close from "../resources/icons/Close";
import styles from "../../src/editor.module.css";
import CalendarContext from "../Context/CalendarContext";
import * as CalendarActions from "../ActionCreators/CalendarActions";
import * as AppointmentActions from "../ActionCreators/AppointmentActions";

const AppointmentEditorView = () => {
  const calendarContext = React.useContext(CalendarContext);

  return calendarContext.calendarState.isAddAppointmentModalVisible ? (
    <div className={styles.content}>
      <div className={styles.background} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <input
            className={styles.title}
            type='text'
            autoFocus={true}
            placeholder={"Title required..."}
            value={
              calendarContext.calendarState.currentAppointment.appointmentTitle
            }
            onChange={React.useCallback(evt => {
              calendarContext.dispatch(
                new AppointmentActions.UpdateTitle(evt.target.value)
              );
            }, [])}
          />
          <div
            className={styles.close}
            role='button'
            onClick={React.useCallback(() => {
              calendarContext.dispatch(
                new CalendarActions.HideAddAppointmentModal()
              );
            }, [])}
          >
            <Close />
          </div>
        </div>
        <div className={styles.form}>
          <label htmlFor='start'>Start</label>
          <input
            className={styles.datetime}
            type='datetime-local'
            id='start'
            value={
              calendarContext.calendarState.currentAppointment.appointmentStart
            }
            onChange={React.useCallback(evt => {
              debugger;
              calendarContext.dispatch(
                new AppointmentActions.UpdateStart(evt.target.value)
              );
            }, [])}
          />
          <div className={styles.error} />
          <label htmlFor='end'>End</label>
          <input
            className={styles.datetime}
            type='datetime-local'
            id='end'
            value={
              calendarContext.calendarState.currentAppointment.appointmentEnd
            }
            onChange={React.useCallback(evt => {
              calendarContext.dispatch(
                new AppointmentActions.UpdateEnd(evt.target.value)
              );
            }, [])}
          />
          <div className={styles.error} />
          <input
            type='button'
            className={styles.deleteBtn}
            value={"Delete"}
            //   onClick={props.onDeleteAppointment}
          />
          <input
            type='button'
            className={styles.save}
            value={"Save"}
            onClick={React.useCallback(() => {
              calendarContext.dispatch(
                new AppointmentActions.CreateAppointment(
                  calendarContext.calendarState.currentAppointment
                )
              );
            }, [])}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default AppointmentEditorView;
