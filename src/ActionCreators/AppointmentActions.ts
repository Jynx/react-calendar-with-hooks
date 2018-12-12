export enum AppointmentActionTypes {
  UPDATE_START = "UPDATE_START",
  UPDATE_TITLE = "UPDATE_TITLE",
  UPDATE_END = "UPDATE_END"
}

export class UpdateTitle {
  readonly type = AppointmentActionTypes.UPDATE_START;
  constructor(public payload: string) {}
}

export class UpdateStart {
  readonly type = AppointmentActionTypes.UPDATE_TITLE;
  constructor(public payload: string) {}
}

export class UpdateEnd {
  readonly type = AppointmentActionTypes.UPDATE_END;
  constructor(public payload: string) {}
}

export type AppointmentAction = UpdateTitle | UpdateStart | UpdateEnd;
