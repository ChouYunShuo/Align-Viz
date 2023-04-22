import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import styles from "../../styles/Topbar.module.css";
interface TopBarProps {
  onSend: (
    input1: string,
    input2: string,
    mode: "Global" | "Local",
    matchScore: string,
    mismatchScore: string,
    gapScore: string
  ) => void;
  onReset: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSend, onReset }) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [mode, setMode] = useState<"Global" | "Local">("Global");
  const [matchScore, setMatchScore] = useState("");
  const [mismatchScore, setMismatchScore] = useState("");
  const [gapScore, setGapScore] = useState("");

  const handleSend = () => {
    onSend(input1, input2, mode, matchScore, mismatchScore, gapScore);
  };
  const handleReset = () => {
    onReset();
  };
  //console.log("In TopBar");
  return (
    <div className="fixed backdrop-blur-sm bg-slate-200 z-50 top-0 left-0 right-0 h-20 shadow-2xl flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <div className="ml-10 text-2xl">Alignment Visualizer</div>
        <div className="mr-10 flex items-center">
          <FormControl variant="standard" sx={{ minWidth: 120, mr: 2 }}>
            <InputLabel id="mode-select-label">Alignment Mode</InputLabel>
            <Select
              labelId="mode-select-label"
              id="mode-select"
              value={mode}
              label="Alignment Mode"
              onChange={(event) =>
                setMode(event.target.value as "Global" | "Local")
              }
            >
              <MenuItem value="Global">Global</MenuItem>
              <MenuItem value="Local">Local</MenuItem>
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
          <div className="flex justify-around m-0 w-1/4">
            <input
              type="text"
              className="w-1/3 p-1 text-sm border border-gray-300 rounded-sm"
              value={matchScore}
              onChange={(event) => setMatchScore(event.target.value)}
              placeholder="match score"
            />
            <input
              type="text"
              value={mismatchScore}
              onChange={(event) => setMismatchScore(event.target.value)}
              className="w-1/3 p-1 text-sm border border-gray-300 rounded-sm"
              placeholder="mismatch score"
            />
            <input
              type="text"
              value={gapScore}
              onChange={(event) => setGapScore(event.target.value)}
              className="w-1/3 p-1 text-sm border border-gray-300 rounded-sm"
              placeholder="gap score"
            />
          </div>
          <Button
            variant="outlined"
            color="success"
            onClick={handleSend}
            className="m-2"
          >
            Send
          </Button>
          <Button variant="outlined" color="error" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
