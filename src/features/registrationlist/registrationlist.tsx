import { Box, Typography } from '@mui/material';

import { useAppSelector } from '../../app/hooks';

import { selectCurrent, selectRegistrations } from '../../slices/timeSlice';
import { Registration } from '../registration/registration';

export function RegistrationList() {

	const date = new Date().toLocaleDateString();
	const currentRegistration = useAppSelector(selectCurrent);
	let registrations = [...useAppSelector(selectRegistrations)[date]];
	if (currentRegistration && currentRegistration.end) {
		registrations.push(currentRegistration);
	}
	return (
		<Box>
			<Typography gutterBottom variant="h5" component="div">
				Registrations ({date})
			</Typography>
			{registrations?.map(registration => <Registration key={registration.start} registration={registration} />)}
		</Box>
	);
}
