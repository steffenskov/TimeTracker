import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface TimeRegistration {
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
      state.current = {
        date: now.toLocaleDateString(),
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
    updateCurrentEnd: (state) => {
      if (state.current) {
        state.current.end = new Date().getTime();
      }
    },
    deleteRegistration: (
      state,
      registration: PayloadAction<TimeRegistration>
    ) => {
      const payload = registration.payload;
      if (
        state.current &&
        state.current.start === payload.start &&
        state.current.project === payload.project
      ) {
        // current is the one being deleted, simply remove it
        state.current = undefined;
      } else {
        const dateRegistrations = state.registrations[payload.date];
        const item = dateRegistrations.find(
          (registration) =>
            payload.project === registration.project &&
            payload.start === registration.start
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
} = TimeSlice.actions;

export const selectCurrent = (state: RootState) => state.time.current;
export const selectRegistrations = (state: RootState) =>
  state.time.registrations;

export default TimeSlice.reducer;
