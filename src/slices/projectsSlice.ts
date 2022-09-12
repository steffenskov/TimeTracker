import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface ProjectsState {
	projects: string[]
}

const initialState: ProjectsState = {
	projects: JSON.parse(localStorage.getItem('projects') || '[]')
};

export const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		addProject: (state, name: PayloadAction<string>) => {
			if (state.projects.indexOf(name.payload) >= 0) {
				return
			}
			state.projects.push(name.payload)
			state.projects.sort()
			localStorage.setItem('projects', JSON.stringify(state.projects))
		},
		deleteProject: (state, name: PayloadAction<string>) => {
			const index = state.projects.indexOf(name.payload);
			if (index >= 0)
				state.projects.splice(index, 1)
			localStorage.setItem('projects', JSON.stringify(state.projects))
		},
	},
});

export const { addProject, deleteProject } = projectsSlice.actions;

export const selectProjects = (state: RootState) => state.projects.projects;

export default projectsSlice.reducer;
