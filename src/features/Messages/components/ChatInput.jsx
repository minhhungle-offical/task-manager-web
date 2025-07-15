import { InputField } from '@/components/FormFields/InputField'
import { Box, Button, IconButton, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import SendIcon from '@mui/icons-material/Send'
export function ChatInput({ onSubmit }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      content: '',
    },
  })

  const handleFormSubmit = handleSubmit(({ content }) => {
    onSubmit?.(content)
    reset()
  })

  return (
    <Stack spacing={1} component="form" noValidate onSubmit={handleFormSubmit}>
      <Box
        sx={{
          position: 'relative',

          '&': {
            input: {
              whiteSpace: 'pre-wrap',
            },

            '.MuiInputBase-root': {
              borderRadius: 3,
              py: 2,
            },
          },
        }}
      >
        <InputField control={control} name="content" />

        <IconButton
          variant="contained"
          size="large"
          type="submit"
          sx={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)' }}
        >
          <SendIcon fontSize="large" />
        </IconButton>
      </Box>
    </Stack>
  )
}
