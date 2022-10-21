import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import dateFormatter from "../utilities/dateFormatter";

export interface TimeRegistration {
  id: number;
  project: string;
  date: string;
  start: number;
  end?: number;
}

export interface DayRegistrations {
  [day: string]: TimeRegistration[];
}

export interface TimeState {
  registrations: DayRegistrations;
  current?: TimeRegistration;
}

let initialState: TimeState = {
  registrations: {},
  current: undefined,
};
const json = localStorage.getItem("time");
if (json) {
  initialState = JSON.parse(json);
}

export const TimeSlice = createSlice({
  name: "Time",
  initialState,
  reducers: {
    startRegistration: (state, name: PayloadAction<string>) => {
      if (state.current) {
        if (state.current.project === name.payload) return;

        state.current.end = new Date().getTime();
        if (!state.registrations[state.current.date])
          state.registrations[state.current.date] = [];
        state.registrations[state.current.date].push(state.current);
      }
      const now = new Date();
      const date = dateFormatter.formatDate(now);
      const existingRegistrations = state.registrations[date];
      let newId = 1;
      if (existingRegistrations) {
        for (let registration of existingRegistrations) {
          if (registration.id >= newId) newId = registration.id + 1;
        }
      }
      state.current = {
        id: newId,
        date: date,
        project: name.payload,
        start: now.getTime(),
      };
      localStorage.setItem("time", JSON.stringify(state));
    },
    stopRegistration: (state) => {
      if (state.current) {
        state.current.end = new Date().getTime();
        if (!state.registrations[state.current.date])
          state.registrations[state.current.date] = [];
        state.registrations[state.current.date].push(state.current);
      }
      state.current = undefined;
      localStorage.setItem("time", JSON.stringify(state));
    },
    updateRegistration: (state, payload: PayloadAction<TimeRegistration>) => {
      const registration = payload.payload;
      const registrationsForDate = state.registrations[registration.date];
      const registrationToUpdate = registrationsForDate.find(
        (item) => item.id === registration.id
      );
      if (!registrationToUpdate) {
        return;
      }
      registrationToUpdate.start = registration.start;
      registrationToUpdate.end = registration.end;
      localStorage.setItem("time", JSON.stringify(state));
    },
    updateCurrentEnd: (state) => {
      if (state.current) {
        state.current.end = new Date().getTime();
      }
    },
    pruneOldRegistrations: (state) => {
      const now = new Date();
      const datesToPrune = [];
      for (let date in state.registrations) {
        const diffMs = now.getTime() - new Date(date).getTime();
        const diffDays = diffMs / 1000 / 60 / 60 / 24;
        if (diffDays > 31) {
          datesToPrune.push(date);
        }
      }
      for (let date of datesToPrune) {
        delete state.registrations[date];
      }
      localStorage.setItem("time", JSON.stringify(state));
    },
    deleteRegistration: (
      state,
      registration: PayloadAction<TimeRegistration>
    ) => {
      const payload = registration.payload;
      if (state.current && state.current.id === payload.id) {
        // current is the one being deleted, simply remove it
        state.current = undefined;
      } else {
        const dateRegistrations = state.registrations[payload.date];
        const item = dateRegistrations.find(
          (registration) => payload.id === registration.id
        );
        if (item) {
          const index = dateRegistrations.indexOf(item);
          if (index >= 0) {
            dateRegistrations.splice(index, 1);
          }
        }
      }
      localStorage.setItem("time", JSON.stringify(state));
    },
  },
});

export const {
  startRegistration,
  stopRegistration,
  updateCurrentEnd,
  deleteRegistration,
  updateRegistration,
  pruneOldRegistrations,
} = TimeSlice.actions;

export const selectCurrent = (state: RootState) => state.time.current;
export const selectRegistrations = (state: RootState) =>
  state.time.registrations;

export default TimeSlice.reducer;
