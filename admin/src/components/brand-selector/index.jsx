import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function BrandSelector() {
  const [open, setOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandPic, setNewBrandPic] = useState(null);
  const [brands, setBrands] = useState([{ label: "Himel", id: 1 }]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [preview, setPreview] = useState(null); // New state variable for the image preview

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_APP_API_URL}/brands`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedBrands = data.map((brand) => ({
          label: brand.name,
          pic: brand.logo,
          id: brand._id,
        }));
        setBrands(formattedBrands);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddBrand = () => {
    // Create a FormData object
    const formData = new FormData();
    formData.append("name", newBrandName);
    formData.append("logo", newBrandPic);

    // Send a POST request to /api/brands
    fetch(`${import.meta.env.VITE_BACKEND_APP_API_URL}/brands/add`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const newBrand = { label: newBrandName, pic: data.logo, id: data._id };
        setBrands([...brands, newBrand]);
        setSelectedBrand(newBrand); // Select the new brand
        setNewBrandName("");
        setNewBrandPic(null);
        setPreview(null); // Reset the preview when the dialog is closed
        handleClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFileChange = (e) => {
    // New function to handle file changes
    const file = e.target.files[0];
    setNewBrandPic(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleBoxClick = (e) => {
    if (newBrandPic) {
      // If a file is already selected, remove it
      setNewBrandPic(null);
      setPreview(null);
    } else {
      // If no file is selected, simulate a click on the file input
      document.getElementById("upload-button").click();
    }
  };

  const handleDeleteBrand = (id) => {
    // Send a DELETE request to /api/brands
    fetch(`${import.meta.env.VITE_BACKEND_APP_API_URL}/brands/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setBrands(brands.filter((brand) => brand.id !== id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <Autocomplete
        dir="rtl"
        value={selectedBrand}
        onChange={(event, newValue) => setSelectedBrand(newValue)}
        options={[{ label: "Add new brand", id: "new" }, ...brands]}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option, { selected }) => (
          <li {...props} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{option.label}</span>
            {option.id !== "new" && (
              <IconButton
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteBrand(option.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </li>
        )}
        renderInput={(params) => <TextField {...params} label="Select a brand" />}
        onInputChange={(event, value) => value === "Add new brand" && handleOpen()}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new brand</DialogTitle>
        <DialogContent>
          <div
            role="button"
            tabIndex={0}
            onClick={handleBoxClick}
            onKeyDown={handleBoxClick}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20vw",
              height: "10vw",
              border: "1px solid #E3E6E9",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundSize: "auto 100%",
              backgroundPosition: "center",
              backgroundImage: `url(${preview})`,
            }}
          >
            {!newBrandPic && <p>Add an image</p>}
          </div>
          <input id="upload-button" type="file" hidden onChange={handleFileChange} />
          <TextField
            autoFocus
            margin="dense"
            label="Brand Name"
            fullWidth
            value={newBrandName}
            onChange={(e) => setNewBrandName(e.target.value)}
          />
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
