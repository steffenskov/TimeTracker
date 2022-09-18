import "./App.css";
import { ProjectList } from "./features/projectlist/projectlist";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Container } from "@mui/material";
import { RegistrationList } from "./features/registrationlist/registrationlist";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Container fixed>
        <Box className="flex">
          <ProjectList />
          <RegistrationList />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
