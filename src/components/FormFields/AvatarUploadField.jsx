import { Avatar, Box, IconButton, Typography } from '@mui/material'
import { useController } from 'react-hook-form'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { useState, useEffect } from 'react'

export function AvatarUploadField({ name, control, disabled = false, size = 100 }) {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const [preview, setPreview] = useState(value?.url || '')

  useEffect(() => {
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value)
      setPreview(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }

    if (value) {
      setPreview(value.url)
    }
  }, [value])

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      onChange(file)
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      <Box position="relative">
        <Avatar src={`${preview}`} sx={{ width: size, height: size }} alt="Avatar" />

        <IconButton
          component="label"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            bgcolor: 'white',
            '&:hover': { bgcolor: 'grey.200' },
          }}
          disabled={disabled}
        >
          <PhotoCamera fontSize="small" />
          <input type="file" accept="image/*" hidden onChange={handleFileChange} ref={ref} />
        </IconButton>
      </Box>

      {error && (
        <Typography color="error" variant="caption">
          {error.message}
        </Typography>
      )}
    </Box>
  )
}
