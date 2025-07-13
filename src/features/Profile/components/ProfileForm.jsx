import { AvatarUploadField } from '@/components/FormFields/AvatarUploadField'
import { InputField } from '@/components/FormFields/InputField'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Stack } from '@mui/material'
import { useEffect } from 'react'
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
  phone: z.string(),
  avatar: z.any().optional(),
})

export function ProfileForm({ loading = false, data, onSubmit }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      avatar: null,
    },
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        avatar: {
          url: data.avatarUrl,
          publicId: data.avatarPublicId,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const id = data?.id

  const handleFormSubmit = handleSubmit((values) => {
    if (!id) return
    const formData = new FormData()
    formData.append('id', data.id)
    formData.append('name', values.name)
    formData.append('email', values.email)
    formData.append('phone', values.phone)

    if (values.avatar instanceof File) {
      formData.append('avatar', values.avatar)
    }
    onSubmit?.(formData)
  })

  return (
    <Stack spacing={2} component="form" onSubmit={handleFormSubmit} noValidate>
      <Box>
        <AvatarUploadField name="avatar" control={control} />
      </Box>

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
          disabled={data?.role === 'employee' || loading}
          placeholder="Enter your email"
        />
      </Box>

      <Box>
        <Stack direction="row" justifyContent="flex-end" alignContent="center" spacing={2}>
          <Button
            variant="contained"
            size="large"
            loading={loading}
            disabled={loading}
            type="submit"
          >
            Update Profile
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}
