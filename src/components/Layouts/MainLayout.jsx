import { Box, Stack } from '@mui/material'
import Sidebar from '../Common/SideBar'
import { useLocation } from 'react-router-dom'

export function MainLayout({ children }) {
  const { pathname } = useLocation()

  return (
    <Stack direction="row" height="100vh">
      <Box>
        <Sidebar pathname={pathname} />
      </Box>
      <Box>{children}</Box>
    </Stack>
  )
}
