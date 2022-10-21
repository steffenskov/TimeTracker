import { Box, Typography } from "@mui/material";

import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import {
  selectCurrent,
  selectRegistrations,
  TimeRegistration,
  pruneOldRegistrations,
} from "../../slices/timeSlice";
import { Registration } from "../registration/registration";
import dateFormatter from "../../utilities/dateFormatter";

export function RegistrationList() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(pruneOldRegistrations());
    }, 1000 * 60 * 60);

    // clear on unmount
    return () => {
      clearInterval(interval);
    };
  }, []); // [] == run once on mount

  const date = dateFormatter.formatDate(new Date());
  const currentRegistration = useAppSelector(selectCurrent);
  const allRegistrations = useAppSelector(selectRegistrations);
  let registrations: TimeRegistration[] = [];
  if (allRegistrations) {
    const datedRegistrations = allRegistrations[date];
    if (datedRegistrations) registrations = [...datedRegistrations];
  }
  if (currentRegistration && currentRegistration.end) {
    registrations.push(currentRegistration);
  }

  return (
    <Box>
      <Typography gutterBottom variant="h5" component="div">
        Registrations ({date})
      </Typography>
      {registrations?.map((registration) => (
        <Registration key={registration.start} registration={registration} />
      ))}
    </Box>
  );
}
