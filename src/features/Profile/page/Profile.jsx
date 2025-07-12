import { Avatar, Box, Button, Container, Divider, Paper, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getMe, updateMe } from '@/stores/slices/authSlice'
import { STATUS } from '@/constants/common'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ProfileForm } from '../components/ProfileForm'

export default function ProfilePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const profile = useSelector((state) => state.auth.profile)
  const token = useSelector((state) => state.auth.token)
  const status = useSelector((state) => state.auth.status)

  useEffect(() => {
    if (token) dispatch(getMe())
  }, [token, dispatch])

  useEffect(() => {
    if (status === STATUS.UPDATED) {
      toast.success('Profile updated successfully')
    }
  }, [status])

  const handleSubmit = (formData) => {
    dispatch(updateMe(formData))
  }

  return (
    <Container maxWidth="sm">
      <Box py={5}>
        <Stack spacing={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Edit Profile
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <ProfileForm
              loading={status === STATUS.LOADING}
              data={profile}
              onSubmit={handleSubmit}
            />
          </Paper>

          <Button variant="text" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}
