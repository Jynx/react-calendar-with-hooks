import moment from "moment";

export enum CalendarActionTypes {
  INCREMENT_MONTH = "INCREMENT_MONTH",
  DECREMENT_MONTH = "DECREMENT_MONTH",
  SET_SELECTED_DAY = "SET_SELECTED_DAY",
  RUN_DEMO_SIDE_EFFECT = "RUN_DEMO_SIDE_EFFECT"
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
export type CalendarAction =
  | IncrementMonth
  | DecrementMonth
  | SetSelectedDay
  | ReturnDemoSideEffect;
