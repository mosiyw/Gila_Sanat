import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  FormGroup,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function DetailsTable() {
  const [details, setDetails] = useState([
    { title: "Detail 1", description: "Description 1" },
    { title: "Detail 2", description: "Description 2" },
    // Add more details here...
  ]);

  const handleAddDetail = () => {
    setDetails([...details, { title: "", description: "" }]);
  };

  const handleDetailChange = (index, field) => (event) => {
    const newDetails = [...details];
    newDetails[index][field] = event.target.value;
    setDetails(newDetails);
  };

  return (
    <TableContainer component={Paper} style={{ direction: "rtl" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="w-[30%]">Title</TableCell>
            <TableCell className="w-[70%]">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((detail, index) => (
            <TableRow key={index}>
              <TableCell>
                <FormGroup>
                  <FormControl>
                    <Input value={detail.title} onChange={handleDetailChange(index, "title")} placeholder="title" />
                  </FormControl>
                </FormGroup>
              </TableCell>
              <TableCell>
                <FormGroup>
                  <FormControl>
                    <Input
                      value={detail.description}
                      onChange={handleDetailChange(index, "description")}
                      placeholder="description"
                    />
                  </FormControl>
                </FormGroup>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2}>
              <IconButton onClick={handleAddDetail}>
                <AddCircleOutlineIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
