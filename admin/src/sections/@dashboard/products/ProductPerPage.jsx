import { useState } from "react";
import { Menu, Button, MenuItem, Typography } from "@mui/material";
import Iconify from "../../../components/iconify";

const PER_PAGE_OPTIONS = [
  { value: 12, label: "12" },
  { value: 24, label: "24" },
  { value: 48, label: "48" },
  { value: 96, label: "96" },
];

export default function ProductPerPage() {
  const [open, setOpen] = useState(null);
  const [perPage, setPerPage] = useState(PER_PAGE_OPTIONS[0].value);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleSelect = (value) => {
    setPerPage(value);
    handleClose();
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? "eva:chevron-up-fill" : "eva:chevron-down-fill"} />}
      >
        Per Page:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: "text.secondary" }}>
          {perPage}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {PER_PAGE_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === perPage}
            onClick={() => handleSelect(option.value)}
            sx={{ typography: "body2" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
