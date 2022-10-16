import { useAppDispatch } from "../../app/hooks";
import { deleteRegistration, updateRegistration } from "../../slices/timeSlice";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { TimeRegistration } from "../../slices/timeSlice";
import timeFormatter from "../../utilities/timeFormatter";
import styles from "./registration.module.css";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";

import { FormEvent, useState } from "react";

export function Registration(props: { registration: TimeRegistration }) {
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);
  const [start, setStart] = useState(
    timeFormatter.formatTimeFromDate(new Date(props.registration.start))
  );
  const [end, setEnd] = useState(
    timeFormatter.formatTimeFromDate(new Date(props.registration.end!))
  );

  const time = timeFormatter.formatTime(
    props.registration.end! - props.registration.start
  );

  function deleteRegistrationHandler() {
    if (
      window.confirm(
        `Are you sure you want to delete this registration for ${props.registration.project}?`
      )
    ) {
      dispatch(deleteRegistration(props.registration));
    }
  }

  function cancelRegistrationHandler() {
    setStart(
      timeFormatter.formatTimeFromDate(new Date(props.registration.start))
    );
    setEnd(timeFormatter.formatTimeFromDate(new Date(props.registration.end!)));
    setEditMode(false);
  }

  function editRegistrationHandler() {
    setEditMode(!editMode);
  }

  function saveRegistrationHandler(event?: FormEvent) {
    event?.preventDefault();
    const registration = { ...props.registration };
    registration.start = createDate(props.registration.start, start);
    if (props.registration.end) {
      registration.end = createDate(props.registration.end, end);
    }
    if (isNaN(registration.start)) {
      alert("Invalid start time");
      return;
    }

    if (typeof registration.end !== "undefined" && isNaN(registration.end)) {
      alert("Invalid end time");
      return;
    }
    if (registration.end && registration.end < registration.start) {
      alert("Start time must be prior to end");
      return;
    }
    dispatch(updateRegistration(registration));
    setEditMode(false);
  }

  function createDate(existingDate: number, time: string): number {
    let dateMs = new Date(new Date(existingDate).toDateString()).getTime();
    let dateString = new Date().toISOString();
    dateString = dateString.substring(0, 11);
    dateString += time + "Z";
    const timeMs = new Date(dateString).getTime();
    return dateMs + timeMs;
  }

  const body = editMode ? (
    <Typography gutterBottom variant="body1" component="div">
      <form onSubmit={saveRegistrationHandler}>
        <TextField
          size="small"
          variant="outlined"
          required
          placeholder="Start"
          className={styles.input}
          value={start}
          onChange={(e) => setStart(e.currentTarget.value)}
        />
        <TextField
          size="small"
          variant="outlined"
          required
          placeholder="End"
          className={styles.input}
          value={end}
          onChange={(e) => setEnd(e.currentTarget.value)}
        />
        <Button
          type="submit"
          variant="contained"
          className={styles.hidden}
        ></Button>
      </form>
    </Typography>
  ) : (
    <Typography gutterBottom variant="body1" component="div">
      {start} - {end}
    </Typography>
  );

  const actions = editMode ? (
    <CardActions>
      <IconButton onClick={saveRegistrationHandler}>
        <SaveIcon />
      </IconButton>
      <IconButton onClick={cancelRegistrationHandler}>
        <CancelIcon />
      </IconButton>
    </CardActions>
  ) : (
    <CardActions>
      <IconButton onClick={editRegistrationHandler}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={deleteRegistrationHandler}>
        <DeleteIcon />
      </IconButton>
    </CardActions>
  );

  return (
    <Card className={styles.registration}>
      <CardContent>
        <Typography variant="h6" component="div">
          {props.registration.project}
        </Typography>
        {body}
        <Typography gutterBottom variant="body1" component="div">
          Tracked: {time}
        </Typography>
      </CardContent>
      {actions}
    </Card>
  );
}
