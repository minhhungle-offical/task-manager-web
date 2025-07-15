import { InputField } from '@/components/FormFields/InputField'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be exactly 6 characters')
    .regex(/^\d{6}$/, 'OTP must contain only digits'),
})

export function VerifyForm({ loading, onSubmit }) {
  const { control, handleSubmit } = useForm({
    defaultValues: { otp: '' },
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = handleSubmit((formValues) => {
    onSubmit?.(formValues)
  })

  return (
    <Stack spacing={2} component="form" onSubmit={handleFormSubmit} noValidate>
      <Box>
        <InputField
          name="otp"
          placeholder="Nhập mã OTP 6 số"
          control={control}
          disabled={loading}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 6 }}
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
          Xác nhận
        </Button>
      </Box>
    </Stack>
  )
}
