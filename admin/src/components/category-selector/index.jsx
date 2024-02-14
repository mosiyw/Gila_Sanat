import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

export default function CategorySelect() {
  const { control, setValue } = useForm();

  const [categories, setCategories] = useState([
    { name: "Electronics", subCategories: [{ name: "Phones", subSubCategories: ["iPhone", "Samsung"] }] },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ level: "", name: "", parent: "" });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddCategory = () => {
    if (newCategory.level === "category") {
      setCategories((prev) => [...prev, { name: newCategory.name, subCategories: [] }]);
    }
    setDialogOpen(false);
  };

  const handleSelectChange = (event, level, parent) => {
    if (event.target.value === "Add") {
      setNewCategory({ level, parent });
      setDialogOpen(true);
    } else {
      setValue(level, event.target.value);
      if (level === "category") {
        setSelectedCategory(event.target.value);
      }
    }
  };

  return (
    <>
      <Controller
        name="category"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            labelId="category-label"
            label="Category"
            onChange={(event) => handleSelectChange(event, "category")}
          >
            {categories.map((category) => (
              <MenuItem key={category.name} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
            <MenuItem value="Add">Add new Category</MenuItem>
          </Select>
        )}
      />
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add new {newCategory.level}</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the name of the new {newCategory.level}.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={`${newCategory.level} Name`}
            type="text"
            fullWidth
            onChange={(event) => setNewCategory((prev) => ({ ...prev, name: event.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddCategory}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
