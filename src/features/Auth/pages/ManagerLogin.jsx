import { STATUS } from '@/constants/common'
import { authActions, loginByPhone, verifyOtpByPhone } from '@/stores/slices/authSlice'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { Box, Button, Container, Dialog, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ManagerLoginForm } from '../components/ManagerLoginForm'
import { VerifyForm } from '../components/VerifyForm'

export function ManagerLogin() {
  const [showVerify, setShowVerify] = useState(false)
  const [counter, setCounter] = useState(120)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const status = useSelector((state) => state.auth.status)
  const phone = useSelector((state) => state.auth.phone)
  const token = useSelector((state) => state.auth.token)
  const error = useSelector((state) => state.auth.error)
  const profile = useSelector((state) => state.auth.profile)
  const accessCodeId = useSelector((state) => state.auth.accessCodeId)

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [counter])

  useEffect(() => {
    if (status === STATUS.LOGGED_IN) {
      setShowVerify(true)
    }

    if (status === STATUS.VERIFIED && token) {
      setShowVerify(false)
      dispatch(authActions.reset())
      localStorage.setItem('token', token)

      if (profile?.name) {
        navigate('/dashboard')
      } else {
        navigate('/profile')
      }
    }

    if (status === STATUS.FAILED) {
      toast.error(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, error, token, profile])

  function handleResend() {
    setCounter(120)
  }

  function handleVerifyOtp(formValues) {
    if (!phone) return
    dispatch(
      verifyOtpByPhone({
        ...formValues,
        phone,
        accessCodeId,
      }),
    )
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  function handleSubmit(formValues) {
    dispatch(loginByPhone(formValues))
  }

  function handleClose() {
    setShowVerify(false)
  }

  return (
    <Container maxWidth="sm">
      <Stack justifyContent="center" alignItems="center" spacing={4} minHeight="100vh">
        <Paper sx={{ width: '100%', p: 3 }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <AdminPanelSettingsIcon sx={{ fontSize: 100, color: 'primary.main' }} />

            <Typography variant="h5" fontWeight={600}>
              Manager Login
            </Typography>
          </Box>

          <Box width="100%">
            <ManagerLoginForm loading={status === STATUS.LOADING} onSubmit={handleSubmit} />
          </Box>
        </Paper>
      </Stack>

      <Dialog fullWidth maxWidth="sm" open={showVerify} onClose={handleClose}>
        <Stack spacing={4} sx={{ p: 3 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" fontWeight={600}>
              Verify OTP
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter the 6-digit code sent to your email
            </Typography>
          </Box>

          <Box width="100%">
            <VerifyForm loading={status === STATUS.LOADING} onSubmit={handleVerifyOtp} />

            <Stack mt={3} direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                {counter > 0
                  ? `Resend available in ${formatTime(counter)}`
                  : "Didn't receive the code?"}
              </Typography>

              <Button
                onClick={handleResend}
                disabled={counter > 0 || status === STATUS.LOADING}
                loading={status === STATUS.LOADING}
                size="small"
                variant="text"
                sx={{ fontWeight: 600 }}
              >
                Resend Code
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Dialog>
    </Container>
  )
}
