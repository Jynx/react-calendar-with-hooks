import { Appointment } from "../App";

export enum AppointmentActionTypes {
  UPDATE_START = "UPDATE_START",
  UPDATE_TITLE = "UPDATE_TITLE",
  UPDATE_END = "UPDATE_END",
  CREATE_APPOINTMENT = "CREATE_APPOINTMENT"
}

export class UpdateTitle {
  readonly type = AppointmentActionTypes.UPDATE_TITLE;
  constructor(public payload: string) {}
}

export class UpdateStart {
  readonly type = AppointmentActionTypes.UPDATE_START;
  constructor(public payload: string) {}
}

export class UpdateEnd {
  readonly type = AppointmentActionTypes.UPDATE_END;
  constructor(public payload: string) {}
}

export class CreateAppointment {
  readonly type = AppointmentActionTypes.CREATE_APPOINTMENT;
  constructor(public payload: Appointment) {}
}

export type AppointmentAction =
  | UpdateTitle
  | UpdateStart
  | UpdateEnd
  | CreateAppointment;
