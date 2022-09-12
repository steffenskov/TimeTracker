import { Card, CardContent, Typography } from '@mui/material';
import { TimeRegistration } from '../../slices/timeSlice';
import timeFormatter from '../../utilities/timeFormatter';
import styles from './registration.module.css';
export function Registration(props: { registration: TimeRegistration }) {

	const start = new Date(props.registration.start).toLocaleTimeString();
	const time = timeFormatter.formatTime(props.registration.end! - props.registration.start);
	const end = new Date(props.registration.end!).toLocaleTimeString();

	return (
		<Card className={styles.registration}>
			<CardContent>
				<Typography variant="h6" component="div">
					{props.registration.project}
				</Typography>
				<Typography gutterBottom variant="body1" component="div">
					{start} - {end}
				</Typography>
				<Typography gutterBottom variant="body1" component="div">
					Tracked: {time}
				</Typography>
			</CardContent>
		</Card>
	);
}
