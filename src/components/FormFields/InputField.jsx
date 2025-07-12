import { Box, TextField, Typography } from "@mui/material";
import { useController } from "react-hook-form";

export function InputField({
  multiline,
  rows = 4,
  label,
  control,
  name,
  placeholder,
  onFieldChange,
  required,
  disabled,

  ...props
}) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = (e) => {
    onChange(e);
    onFieldChange?.(e);
  };

  return (
    <Box>
      {label && (
        <Typography
          variant="caption"
          fontWeight={600}
          color="textSecondary"
          gutterBottom
        >
          {label}{" "}
          {required && (
            <Box component="span" sx={{ color: "error.main" }}>
              *
            </Box>
          )}
        </Typography>
      )}
      <TextField
        size="medium"
        variant="outlined"
        multiline={multiline}
        disabled={disabled}
        rows={rows}
        fullWidth
        name={name}
        value={value ?? ""}
        onChange={handleChange}
        onBlur={onBlur}
        inputRef={ref}
        error={!!error}
        helperText={error?.message}
        placeholder={placeholder}
        {...props}
      />
    </Box>
  );
}
