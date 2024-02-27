import React, { useState } from "react";
import { Autocomplete, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

function BrandSelector({ onNewBrand }) {
  const [open, setOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandPic, setNewBrandPic] = useState(null);
  const [brands, setBrands] = useState([{ label: "Himel", id: 1 }]);
  const [selectedBrand, setSelectedBrand] = useState(null); // New state variable for the selected brand

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddBrand = () => {
    const newBrand = { label: newBrandName, pic: newBrandPic, id: brands.length + 1 };
    onNewBrand(newBrand);
    setBrands([...brands, newBrand]);
    setNewBrandName("");
    setNewBrandPic(null);
    handleClose();
  };

  return (
    <div>
      <Autocomplete
        value={selectedBrand} // Pass the selected brand as the value
        onChange={(event, newValue) => setSelectedBrand(newValue)} // Update the selected brand when it changes
        options={[{ label: "Add new brand", id: "new" }, ...brands]}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField {...params} label="Select a brand" />}
        onInputChange={(event, value) => value === "Add new brand" && handleOpen()}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new brand</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Brand Name"
            fullWidth
            value={newBrandName}
            onChange={(e) => setNewBrandName(e.target.value)}
          />
          <Button variant="contained" component="label">
            Upload Picture
            <input type="file" hidden onChange={(e) => setNewBrandPic(e.target.files[0])} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddBrand}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BrandSelector;
