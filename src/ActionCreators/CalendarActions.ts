import moment from "moment";
import { AppointmentAction } from "../ActionCreators/AppointmentActions";

export enum CalendarActionTypes {
  INCREMENT_MONTH = "INCREMENT_MONTH",
  DECREMENT_MONTH = "DECREMENT_MONTH",
  SET_SELECTED_DAY = "SET_SELECTED_DAY",
  RUN_DEMO_SIDE_EFFECT = "RUN_DEMO_SIDE_EFFECT",
  SHOW_ADD_APPOINTMENT_MODAL = "SHOW_ADD_APPOINTMENT_MODAL",
  HIDE_ADD_APPOINTMENT_MODAL = "HIDE_ADD_APPOINTMENT_MODAL"
}

export class IncrementMonth {
  readonly type = CalendarActionTypes.INCREMENT_MONTH;
  constructor() {}
}

export class DecrementMonth {
  readonly type = CalendarActionTypes.DECREMENT_MONTH;
  constructor() {}
}

export class SetSelectedDay {
  readonly type = CalendarActionTypes.SET_SELECTED_DAY;
  constructor(public payload: moment.Moment) {}
}

export class ReturnDemoSideEffect {
  readonly type = CalendarActionTypes.RUN_DEMO_SIDE_EFFECT;
  constructor(public payload: string) {}
}

export class ShowAddAppointmentModal {
  readonly type = CalendarActionTypes.SHOW_ADD_APPOINTMENT_MODAL;
  constructor() {}
}

export class HideAddAppointmentModal {
  readonly type = CalendarActionTypes.HIDE_ADD_APPOINTMENT_MODAL;
  constructor() {}
}

type CalendarStateAction =
  | IncrementMonth
  | DecrementMonth
  | SetSelectedDay
  | ReturnDemoSideEffect
  | ShowAddAppointmentModal
  | HideAddAppointmentModal;

export type CalendarAction = CalendarStateAction | AppointmentAction;
