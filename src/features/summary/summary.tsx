import { Chip } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styles from "../project/project.module.css";

import { selectCurrent, selectRegistrations } from "../../slices/timeSlice";
import timeFormatter from "../../utilities/timeFormatter";
import dateFormatter from "../../utilities/dateFormatter";

export function Summary() {
  const currentRegistration = useAppSelector(selectCurrent);
  const registrations =
    useAppSelector(selectRegistrations)[dateFormatter.formatDate(new Date())];

  function getLabel(): string {
    let timeSpent = 0;

    if (registrations) {
      for (let registration of registrations) {
        timeSpent += registration.end! - registration.start;
      }
    }

    if (currentRegistration) {
      const now = new Date().getTime();
      timeSpent += now - currentRegistration.start;
    }
    if (timeSpent > 0) return `Total: ${timeFormatter.formatTime(timeSpent)}`;
    else return "Total:";
  }

  const label = getLabel();

  return (
    <div className={styles.project}>
      <Chip
        icon={<AccessTimeIcon />}
        className={styles.chip}
        variant="filled"
        label={label}
        color="info"
      />
    </div>
  );
}
