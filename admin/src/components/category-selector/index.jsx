import MainCategorySelector from "./main-category-selector";
import SubCategorySelect from "./sub-category-selector";
import { Grid, FormControl } from "@mui/material";

export default function CategorySelect() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <MainCategorySelector />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <MainCategorySelector />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
