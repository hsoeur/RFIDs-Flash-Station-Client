import { CssBaseline, ThemeProvider } from "@mui/material";
import SolderingProgramUi from "./Components/SolderingProgramUi";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SolderingProgramUi />
    </ThemeProvider>
  );
}

export default App;
