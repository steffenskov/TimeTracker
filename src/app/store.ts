import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import projectsSlice from '../slices/projectsSlice';
import timeSlice from '../slices/timeSlice';

export const store = configureStore({
	reducer: {
		projects: projectsSlice,
		time: timeSlice
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
