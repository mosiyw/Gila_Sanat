/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

function ControlledInputText({ fullWidth, name, control, label, rules, type, direction }) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { ...rules },
    defaultValue: "",
  });

  return (
    <TextField
      {...field}
      label={label}
      error={Boolean(error)}
      fullWidth={fullWidth}
      type={type}
      inputProps={{ style: { direction: direction } }}
    />
  );
}

ControlledInputText.propTypes = {
  fullWidth: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.any,
  rules: PropTypes.shape({
    required: PropTypes.bool,
  }),
  type: PropTypes.string,
  direction: PropTypes.oneOf(["ltr", "rtl"]),
};

export default ControlledInputText;
