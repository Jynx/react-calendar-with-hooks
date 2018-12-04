import moment from "moment";

export enum CalendarActionTypes {
  INCREMENT_MONTH = "INCREMENT_MONTH",
  DECREMENT_MONTH = "DECREMENT_MONTH"
}

export class IncrementMonth {
  readonly type = CalendarActionTypes.INCREMENT_MONTH;
  constructor(public payload: moment.Moment) {}
}

export class DecrementMonth {
  readonly type = CalendarActionTypes.DECREMENT_MONTH;
  constructor(public payload: moment.Moment) {}
}

export type CalendarAction = IncrementMonth | DecrementMonth;
