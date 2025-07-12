import { InputField } from '@/components/FormFields/InputField'
import { Box, Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'

export function EmployeeLoginForm({ loading, onSubmit }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
  })
  const handleFormSubmit = handleSubmit((formValues) => {
    onSubmit?.(formValues)
  })

  return (
    <Stack spacing={2} component="form" onSubmit={handleFormSubmit} noValidate>
      <Box>
        <InputField
          name="email"
          label="Email"
          disabled={loading}
          control={control}
          placeholder="+84XXXXXXXXX"
        />
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
          Login
        </Button>
      </Box>
    </Stack>
  )
}
