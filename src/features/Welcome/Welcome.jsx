import React from 'react'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import WorkIcon from '@mui/icons-material/Work'
import Diversity3Icon from '@mui/icons-material/Diversity3' // Icon chính giữa bự

import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Welcome() {
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)

  const onChange = (role) => {
    if (role === 'manager') {
      navigate('/auth/manager-login')
      return
    }

    navigate('/auth/employee-login')
  }

  if (token) {
    return <Navigate to="/dashboard" />
  }

  return (
    <Container maxWidth="sm">
      <Stack justifyContent="center" alignItems="center" minHeight="100vh" spacing={4}>
        <Box>
          <Diversity3Icon sx={{ fontSize: 100, color: 'primary.main' }} />
        </Box>
        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome to TaskManager!
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Please choose your role to continue.
          </Typography>
        </Box>

        <Box width="100%">
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => onChange('manager')}
              startIcon={<AdminPanelSettingsIcon />}
              sx={{ py: 2 }}
            >
              I am a Manager
            </Button>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={() => onChange('employee')}
              startIcon={<WorkIcon />}
              sx={{ py: 2 }}
            >
              I am an Employee
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}
