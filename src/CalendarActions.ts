import moment from "moment";

export enum CalendarActionTypes {
  INCREMENT_MONTH = "INCREMENT_MONTH",
  DECREMENT_MONTH = "DECREMENT_MONTH"
}

type IncrementMonthAction = {
  type: CalendarActionTypes.INCREMENT_MONTH;
  payload: {
    date: moment.Moment;
  };
};

type DecrementMonthAction = {
  type: CalendarActionTypes.DECREMENT_MONTH;
  payload: {
    date: moment.Moment;
  };
};

export type CalendarAction = IncrementMonthAction | DecrementMonthAction;
