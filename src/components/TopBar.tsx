import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
interface TopBarProps {
  onSend: (input1: string, input2: string, mode: "global" | "local") => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSend }) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [mode, setMode] = useState<"global" | "local">("global");

  const handleSend = () => {
    onSend(input1, input2, mode);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sequence Alignment Visualization
        </Typography>
        <FormControl variant="standard" sx={{ minWidth: 120, mr: 2 }}>
          <InputLabel id="mode-select-label">Alignment Mode</InputLabel>
          <Select
            labelId="mode-select-label"
            id="mode-select"
            value={mode}
            label="Alignment Mode"
            onChange={(event) =>
              setMode(event.target.value as "global" | "local")
            }
          >
            <MenuItem value="global">Global</MenuItem>
            <MenuItem value="local">Local</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Sequence 1"
          value={input1}
          onChange={(event) => setInput1(event.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Sequence 2"
          value={input2}
          onChange={(event) => setInput2(event.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="secondary" onClick={handleSend}>
          Send
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
