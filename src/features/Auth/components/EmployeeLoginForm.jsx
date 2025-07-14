import { InputField } from '@/components/FormFields/InputField'
import { Box, Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'),
})

export function EmployeeLoginForm({ loading, onSubmit }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
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
          placeholder="employee@example.com"
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
