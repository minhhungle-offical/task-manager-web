import { InputField } from '@/components/FormFields/InputField'
import { StatusField } from '@/components/FormFields/StatusField'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Invalid email format',
    }),
  phone: z.string().regex(/^\+\d{8,15}$/, 'Phone must start with "+" and contain 8–15 digits'),
  isActive: z.boolean().optional(),
})

export const AddEditEmployeeForm = forwardRef(({ loading = false, data = {}, onSubmit }, ref) => {
  const defaultValues = {
    name: data?.name || '',
    email: data?.email || '',
    phone: data?.phone || '',
    isActive: data?.isActive ?? true,
  }

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = handleSubmit((formValues) => {
    onSubmit?.(formValues)
  })

  useImperativeHandle(ref, () => ({
    submit: handleFormSubmit,
  }))

  const isManager = data?.role === 'manager'

  return (
    <Stack spacing={2} component="form" onSubmit={handleFormSubmit} noValidate>
      <StatusField name="isActive" control={control} disabled={loading} />

      <InputField
        name="phone"
        label="Phone Number"
        control={control}
        disabled={isManager || loading}
        placeholder="+84XXXXXXXXX"
      />

      <InputField
        name="name"
        label="Full Name"
        control={control}
        disabled={loading}
        placeholder="Enter full name"
      />

      <InputField
        name="email"
        label="Email Address"
        control={control}
        disabled={loading}
        placeholder="Enter email address"
      />
    </Stack>
  )
})
