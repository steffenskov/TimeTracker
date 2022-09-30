import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addProject, selectProjects } from "../../slices/projectsSlice";

import { updateCurrentEnd } from "../../slices/timeSlice";
import { Project } from "../project/project";
import { Summary } from "../summary/summary";

export function ProjectList() {
  const projects = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateCurrentEnd());
    }, 1000);

    // clear on unmount
    return () => {
      clearInterval(interval);
    };
  }, []); // [] == run once on mount

  const [projectName, setProjectName] = useState("");

  function addProjectName(event: FormEvent) {
    event.preventDefault();
    if (projects.indexOf(projectName) >= 0) {
      window.alert(`Project "${projectName}" already exists.`);
      return;
    }
    dispatch(addProject(projectName));
    setProjectName("");
  }

  return (
    <Box>
      <Typography gutterBottom variant="h5" component="div">
        Projects
      </Typography>
      <Card>
        <CardContent>
          {projects.map((project) => (
            <Project key={project} name={project} />
          ))}
          <Summary />
        </CardContent>
        <CardActions>
          <form onSubmit={addProjectName}>
            <TextField
              size="small"
              variant="outlined"
              required
              placeholder="New project name"
              value={projectName}
              onChange={(e) => setProjectName(e.currentTarget.value)}
            />
            <Button type="submit" variant="contained">
              +
            </Button>
          </form>
        </CardActions>
      </Card>
    </Box>
  );
}
