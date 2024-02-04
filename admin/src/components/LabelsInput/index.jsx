import React, { useState } from "react";
import { Chip, TextField, IconButton, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ControlledInputText from "../controlled-input";

function LabelsInput({ labels, setLabels }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleDelete = (labelToDelete) => () => {
    setLabels(labels.filter((label) => label !== labelToDelete));
    setError(false);
  };

  const handleDeleteAll = () => {
    setLabels([]);
    setError(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (input && !labels.includes(input) && labels.length < 20) {
        setLabels([...labels, input]);
        setError(false);
      } else if (labels.length >= 20) {
        setError(true);
      }
      setInput("");
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "90%" }}>
          <TextField
            value={input}
            fullWidth
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            variant="outlined"
            label="Labels"
            autoComplete="off"
            error={error}
            helperText={error ? "Maximum number of labels reached" : ""}
          />
        </div>
        <div style={{ width: "10%", display: "flex", justifyContent: "center" }}>
          <Button onClick={handleDeleteAll} variant="contained" color="error">
            <IconButton color="inherit">
              <DeleteIcon />
            </IconButton>
          </Button>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        {labels.map((label) => (
          <Chip key={label} label={label} onDelete={handleDelete(label)} style={{ margin: "0 5px 5px 0" }} />
        ))}
      </div>
    </>
  );
}

export default LabelsInput;
