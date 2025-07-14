import { DateTimeField } from '@/components/FormFields/DataTimeField'
import { InputField } from '@/components/FormFields/InputField'
import { SelectField } from '@/components/FormFields/SelectField'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/material'
import dayjs from 'dayjs'
import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  assignedTo: z.string().optional(),
  dueDate: z.string().optional(),
})

export const AddEditTaskForm = forwardRef(({ loading = false, data, onSubmit, userList }, ref) => {
  const { control, handleSubmit } = useForm({
    defaultValues: data || {
      title: data?.title || '',
      description: data?.description || '',
      assignedTo: data?.assignedTo || '',
      dueDate: data?.dueDate ? dayjs(data.dueDate.toDate()) : dayjs(),
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
        <InputField name="title" label="Tilte" control={control} />
      </Box>

      <Box>
        <DateTimeField name="dueDate" label="Due Date" control={control} />
      </Box>

      <Box>
        <SelectField
          name="assignedTo"
          label="Assigned to"
          control={control}
          disabled={loading}
          options={userList}
        />
      </Box>

      <Box>
        <InputField
          name="description"
          label="Description"
          control={control}
          disabled={loading}
          placeholder="Enter your name"
          multiline
          rows={4}
        />
      </Box>
    </Stack>
  )
})
