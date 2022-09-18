import { useAppSelector, useAppDispatch } from "../../app/hooks";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteProject } from "../../slices/projectsSlice";
import {
  selectCurrent,
  selectRegistrations,
  startRegistration,
  stopRegistration,
} from "../../slices/timeSlice";
import { Chip } from "@mui/material";
import styles from "./project.module.css";
import timeFormatter from "../../utilities/timeFormatter";
export function Project(props: { name: string }) {
  const dispatch = useAppDispatch();
  const currentRegistration = useAppSelector(selectCurrent);
  const isCurrent = currentRegistration?.project === props.name;
  const registrations =
    useAppSelector(selectRegistrations)[new Date().toLocaleDateString()];

  function deleteProjectName() {
    if (window.confirm(`Are you sure you want to delete "${props.name}" ?`)) {
      if (isCurrent) {
        dispatch(stopRegistration());
      }
      dispatch(deleteProject(props.name));
    }
  }

  function startProjectName() {
    if (isCurrent) {
      dispatch(stopRegistration());
      return;
    }
    dispatch(startRegistration(props.name));
  }

  function getLabel(projectName: string): string {
    let timeSpent = 0;

    const projectRegistrations = registrations?.filter(
      (registration) => registration.project === projectName
    );
    if (projectRegistrations) {
      for (let registration of projectRegistrations) {
        timeSpent += registration.end! - registration.start;
      }
    }

    if (currentRegistration?.project === projectName) {
      const now = new Date().getTime();
      timeSpent += now - currentRegistration.start;
    }
    if (timeSpent > 0)
      return `${props.name} (${timeFormatter.formatTime(timeSpent)})`;
    else return props.name;
  }

  const icon = isCurrent ? <CircularProgress size={20} /> : <PlayCircleIcon />;
  const color = isCurrent ? "success" : "default";
  const label = getLabel(props.name);
  const onDelete = isCurrent ? undefined : deleteProjectName;

  return (
    <div className={styles.project}>
      <Chip
        deleteIcon={<DeleteIcon />}
        className={styles.chip}
        icon={icon}
        variant="filled"
        color={color}
        label={label}
        onDelete={onDelete}
        onClick={startProjectName}
      />
    </div>
  );
}
