import { OTP_TTL_SECONDS, STATUS } from '@/constants/common'
import {
  authActions,
  loginByEmail,
  resendOtpByEmail,
  verifyOtpByEmail,
} from '@/stores/slices/authSlice'
import WorkIcon from '@mui/icons-material/Work'
import { Box, Button, Container, Dialog, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { EmployeeLoginForm } from '../components/EmployeeLoginForm'
import { VerifyForm } from '../components/VerifyForm'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export function EmployeeLogin() {
  const [showVerify, setShowVerify] = useState(false)
  const [counter, setCounter] = useState(OTP_TTL_SECONDS)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, email, token, error, profile, accessCodeId } = useSelector((state) => state.auth)

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
      navigate('/dashboard')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, error, token, profile])

  function handleClose() {
    setShowVerify(false)
  }

  function handleLogin(formValues) {
    dispatch(loginByEmail(formValues))
  }

  function handleVerifyOtp(formValues) {
    if (!email) return
    dispatch(
      verifyOtpByEmail({
        ...formValues,
        email,
        accessCodeId,
      }),
    )
  }

  function handleResend() {
    dispatch(resendOtpByEmail({ email, accessCodeId }))
    setCounter(OTP_TTL_SECONDS)
  }

  if (token) {
    return <Navigate to="/dashboard" />
  }

  return (
    <Container maxWidth="sm">
      <Stack justifyContent="center" alignItems="center" spacing={4} minHeight="100vh">
        <Paper sx={{ width: '100%', p: 3 }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <WorkIcon sx={{ fontSize: 100, color: 'primary.main' }} />

            <Typography variant="h5" fontWeight={600}>
              Employee Login
            </Typography>
          </Box>

          <Box width="100%">
            <EmployeeLoginForm loading={status === STATUS.LOADING} onSubmit={handleLogin} />
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
