import { useAppDispatch } from "../../app/hooks";
import { deleteRegistration } from "../../slices/timeSlice";

import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { TimeRegistration } from "../../slices/timeSlice";
import timeFormatter from "../../utilities/timeFormatter";
import styles from "./registration.module.css";

import DeleteIcon from "@mui/icons-material/Delete";

export function Registration(props: { registration: TimeRegistration }) {
  const dispatch = useAppDispatch();

  const start = new Date(props.registration.start).toLocaleTimeString();
  const time = timeFormatter.formatTime(
    props.registration.end! - props.registration.start
  );
  const end = new Date(props.registration.end!).toLocaleTimeString();

  function deleteRegistrationHandler() {
    if (
      window.confirm(
        `Are you sure you want to delete this registration for ${props.registration.project}?`
      )
    ) {
      dispatch(deleteRegistration(props.registration));
    }
  }

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
      <CardActions>
        <IconButton onClick={deleteRegistrationHandler}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
