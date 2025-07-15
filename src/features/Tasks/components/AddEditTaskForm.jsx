import { DateTimeField } from '@/components/FormFields/DataTimeField'
import { InputField } from '@/components/FormFields/InputField'
import { SelectField } from '@/components/FormFields/SelectField'
import { ASSIGN_STATUS, ASSIGN_STATUS_OPTIONS } from '@/constants/common'
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
  dueDate: z
    .any()
    .refine((val) => dayjs(val).isValid(), { message: 'Invalid date' })
    .optional(),
  status: z.string().optional(),
})

export const AddEditTaskForm = forwardRef(
  ({ loading = false, canEdit = true, data = {}, onSubmit, userList = [] }, ref) => {
    const { control, handleSubmit } = useForm({
      defaultValues: {
        title: data?.title || '',
        description: data?.description || '',
        assignedTo: data?.assignedTo || '',
        dueDate: data?.dueDate
          ? dayjs(data?.dueDate.toDate ? data?.dueDate.toDate() : data?.dueDate)
          : dayjs(),
        status: data?.status || ASSIGN_STATUS.DRAFT,
      },
      resolver: zodResolver(schema),
    })

    const handleFormSubmit = handleSubmit((formValues) => {
      const payload = {
        ...formValues,
        dueDate: dayjs(formValues.dueDate).toDate(),
      }
      onSubmit?.(payload)
    })

    useImperativeHandle(ref, () => ({
      submit: handleFormSubmit,
    }))

    return (
      <Stack spacing={2} component="form" onSubmit={handleFormSubmit} noValidate>
        <InputField name="title" label="Title" control={control} disabled={!canEdit || loading} />

        <DateTimeField
          name="dueDate"
          label="Due Date"
          control={control}
          disabled={!canEdit || loading}
        />

        <SelectField
          name="assignedTo"
          label="Assigned to"
          control={control}
          disabled={!canEdit || loading}
          options={userList}
        />

        {data?.id && (
          <SelectField
            control={control}
            label="Status"
            name="status"
            options={ASSIGN_STATUS_OPTIONS}
          />
        )}

        <InputField
          name="description"
          label="Description"
          control={control}
          disabled={!canEdit || loading}
          placeholder="Enter description"
          multiline
          rows={4}
        />
      </Stack>
    )
  },
)

AddEditTaskForm.displayName = 'AddEditTaskForm'
