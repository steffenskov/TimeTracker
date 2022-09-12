import { Box, Typography } from '@mui/material';

import { useAppSelector } from '../../app/hooks';

import { selectRegistrations } from '../../slices/timeSlice';
import { Registration } from '../registration/registration';

export function RegistrationList() {

	const date = new Date().toLocaleDateString();
	const registrations = useAppSelector(selectRegistrations)[date];

	return (
		<Box>
			<Typography gutterBottom variant="h5" component="div">
				Registrations ({date})
			</Typography>
			{registrations?.map(registration => <Registration key={registration.start} registration={registration} />)}
		</Box>
	);
}
