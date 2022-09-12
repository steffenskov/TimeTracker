import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { PlayCircle } from '@mui/icons-material';

import {
	deleteProject
} from '../../slices/projectsSlice';
import {
	selectCurrent, selectRegistrations, startRegistration, stopRegistration
} from '../../slices/timeSlice';
import { Chip } from '@mui/material';
import styles from './project.module.css';
import timeFormatter from '../../utilities/timeFormatter';
export function Project(props: { name: string }) {

	const dispatch = useAppDispatch();
	const currentRegistration = useAppSelector(selectCurrent);
	const registrations = useAppSelector(selectRegistrations)[new Date().toLocaleDateString()];

	function deleteProjectName() {
		if (window.confirm(`Are you sure you want to delete "${props.name}" ?`)) {
			if (currentRegistration?.project === props.name) {
				dispatch(stopRegistration());
			}
			dispatch(deleteProject(props.name));
		}
	}

	function startProjectName() {
		if (currentRegistration?.project === props.name) {
			dispatch(stopRegistration());
			return;
		}
		dispatch(startRegistration(props.name));
	}

	function getLabel(projectName: string): string {
		let timeSpent = 0

		const projectRegistrations = registrations?.filter(registration => registration.project === projectName)
		if (projectRegistrations) {
			for (let registration of projectRegistrations) {
				timeSpent += registration.end! - registration.start
			}
		}

		if (currentRegistration?.project === projectName) {
			const now = new Date().getTime()
			timeSpent += now - currentRegistration.start
		}
		if (timeSpent > 0)
			return `${props.name} (${timeFormatter.formatTime(timeSpent)})`
		else
			return props.name
	}

	return (
		<div className={styles.project}>
			<Chip icon={<PlayCircle />} variant="filled" color={currentRegistration?.project === props.name ? 'success' : 'default'} label={true ? `${getLabel(props.name)}` : props.name} onDelete={deleteProjectName} onClick={startProjectName} />
		</div>
	);
}
