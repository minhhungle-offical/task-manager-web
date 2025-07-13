import { InputField } from '@/components/FormFields/InputField'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Stack } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Invalid email',
    }),
  phone: z.string().regex(/^\+\d{8,15}$/, 'Phone must start with "+" and contain 8–15 digits'),
})

export const AddEditEmployeeForm = forwardRef(({ loading = false, data, onSubmit }, ref) => {
  const { control, handleSubmit } = useForm({
    defaultValues: data || {
      name: data?.name || '',
      email: data?.email || '',
      phone: data?.phone || '',
    },
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = handleSubmit((formValues) => {
    onSubmit?.(formValues)
  })

  useImperativeHandle(ref, () => ({
    submit: handleFormSubmit,
  }))

  return (
    <Stack spacing={2} component="form" onSubmit={handleFormSubmit} noValidate>
      <Box>
        <InputField
          name="phone"
          label="Phone Number"
          control={control}
          disabled={data?.role === 'manager' || loading}
          placeholder="+84XXXXXXXXX"
        />
      </Box>

      <Box>
        <InputField
          name="name"
          label="Full Name"
          control={control}
          disabled={loading}
          placeholder="Enter your name"
        />
      </Box>

      <Box>
        <InputField
          name="email"
          label="Email Address"
          control={control}
          disabled={loading}
          placeholder="Enter your email"
        />
      </Box>
    </Stack>
  )
})
