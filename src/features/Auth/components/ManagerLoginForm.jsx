import { InputField } from '@/components/FormFields/InputField'
import { Box, Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  phone: z.string().regex(/^\+\d{8,15}$/, 'Phone must start with "+" and contain 8–15 digits'),
})

export function ManagerLoginForm({ loading, onSubmit }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone: '',
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
          name="phone"
          label="Phone Number"
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
