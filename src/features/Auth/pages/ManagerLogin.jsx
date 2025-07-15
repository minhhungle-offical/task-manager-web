import { OTP_TTL_SECONDS, STATUS } from '@/constants/common'
import {
  authActions,
  loginByPhone,
  resendOtpByPhone,
  verifyOtpByPhone,
} from '@/stores/slices/authSlice'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { Alert, Box, Button, Container, Dialog, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { ManagerLoginForm } from '../components/ManagerLoginForm'
import { VerifyForm } from '../components/VerifyForm'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export function ManagerLogin() {
  const [showVerify, setShowVerify] = useState(false)
  const [counter, setCounter] = useState(OTP_TTL_SECONDS)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, phone, token, error, profile, accessCodeId } = useSelector((state) => state.auth)

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
    dispatch(loginByPhone(formValues))
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

  function handleResend() {
    dispatch(resendOtpByPhone({ phone, accessCodeId }))
    setCounter(OTP_TTL_SECONDS)
  }

  if (token) {
    return <Navigate to="/dashboard" />
  }

  console.log('count', counter)

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

          <Box sx={{ mb: 2 }}>
            <Alert severity="warning">
              This is just a trial version. Please use a phone number that has been verified in
              Twilio.
              <br />
              <strong> Format: +CountryCodePhoneNumber</strong> (e.g. <strong>+84989830760</strong>)
            </Alert>
          </Box>

          <Box width="100%">
            <ManagerLoginForm loading={status === STATUS.LOADING} onSubmit={handleLogin} />
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
              Enter the 6-digit code sent to your phone
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
