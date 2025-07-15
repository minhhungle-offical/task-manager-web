import { Box, FormControlLabel, Switch, Typography } from '@mui/material'
import { useController } from 'react-hook-form'

export function StatusField({ label = 'Status', name, control, disabled, required }) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: false,
  })

  return (
    <Box>
      <Typography variant="body2" fontWeight={600} color="textSecondary" gutterBottom>
        {label}
        {required && (
          <Box component="span" sx={{ color: 'error.main', ml: 0.5 }}>
            *
          </Box>
        )}
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
          />
        }
        label={value ? 'Active' : 'Inactive'}
        sx={{ mt: 0.5 }}
      />

      {error && (
        <Typography variant="caption" color="error">
          {error.message}
        </Typography>
      )}
    </Box>
  )
}
