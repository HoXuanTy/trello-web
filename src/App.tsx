import Button from "@mui/material/Button";

import { useColorScheme } from "@mui/material/styles";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  
  return (
    <Button
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}

function App() {
  return (
    <div>
      <ModeToggle />
      <hr/>
      <p>Dev T</p>
      <Button variant="contained">Hello world</Button>
    </div>
  );
}

export default App;
