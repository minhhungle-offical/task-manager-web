import { InputField } from '@/components/FormFields/InputField'
import { Box, Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'

export function VerifyForm({ loading, onSubmit }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      otp: '',
    },
  })
  const handleFormSubmit = handleSubmit((formValues) => {
    onSubmit?.(formValues)
  })

  return (
    <Stack spacing={2} component="form" onSubmit={handleFormSubmit} noValidate>
      <Box>
        <InputField name="otp" placeholder="XXXXXX" control={control} disabled={loading} />
      </Box>

      <Box>
        <Button
          fullWidth
          variant="contained"
          size="large"
          loading={loading}
          disabled={loading}
          type="submit"
        >
          Verify
        </Button>
      </Box>
    </Stack>
  )
}
