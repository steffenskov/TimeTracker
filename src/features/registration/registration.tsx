import { Card, CardContent, Typography } from '@mui/material';
import { TimeRegistration } from '../../slices/timeSlice';
import timeFormatter from '../../utilities/timeFormatter';
export function Registration(props: { registration: TimeRegistration }) {

	const start = new Date(props.registration.start).toLocaleTimeString()
	const time = timeFormatter.formatTime(props.registration.end! - props.registration.start)

	return (
		<Card>
			<CardContent>
				<Typography variant="h5" component="div">
					{props.registration.project}
				</Typography>
				<Typography gutterBottom variant="body1" component="div">
					Started: {start}
				</Typography>
				<Typography gutterBottom variant="body1" component="div">
					Time spent: {time}
				</Typography>
			</CardContent>
		</Card>
	);
}
