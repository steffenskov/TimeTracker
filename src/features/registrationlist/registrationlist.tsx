import { Box, Typography } from '@mui/material';

import { useAppSelector } from '../../app/hooks';

import { selectCurrent, selectRegistrations, TimeRegistration } from '../../slices/timeSlice';
import { Registration } from '../registration/registration';

export function RegistrationList() {

	const date = new Date().toLocaleDateString();
	const currentRegistration = useAppSelector(selectCurrent);
	const allRegistrations = useAppSelector(selectRegistrations);
	let registrations: TimeRegistration[] = [];
	if (allRegistrations) {
		const datedRegistrations = allRegistrations[date];
		if (datedRegistrations)
			registrations = [...datedRegistrations];
	}
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
