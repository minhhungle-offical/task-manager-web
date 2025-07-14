import { authActions, getMe } from '@/stores/slices/authSlice'
import { Box, LinearProgress, Stack } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { Header } from '../Common/Header'
import Sidebar from '../Common/SideBar'
import { STATUS } from '@/constants/common'
import { employeeGetActive } from '@/stores/slices/employeeSlice'
import GroupIcon from '@mui/icons-material/Group'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'

const sidebarWidth = 250

const hasPermission = (roleList, role) => {
  if (Array.isArray(roleList) && roleList.length && role) {
    return roleList.includes(role)
  }

  return false
}

export function MainLayout({ children }) {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const profile = useSelector((state) => state.auth.profile)
  const status = useSelector((state) => state.auth.status)

  const navList = [
    {
      id: 'tasks',
      label: 'Tasks',
      icon: <AssignmentIcon />,
      path: '/dashboard/tasks',
      hasPermission: hasPermission(['manager', 'employee'], profile?.role),
    },
    {
      id: 'employees',
      label: 'Employees',
      icon: <GroupIcon />,
      path: '/dashboard/employees',
      hasPermission: hasPermission(['manager'], profile?.role),
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: <ChatBubbleIcon />,
      path: '/dashboard/messages',
      hasPermission: hasPermission(['manager', 'employee'], profile?.role),
    },
  ]

  useEffect(() => {
    dispatch(employeeGetActive())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(getMe())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!token) {
    return <Navigate to="/welcome" />
  }

  if (status === STATUS.LOADING) {
    return <LinearProgress />
  }

  return (
    <Stack direction="row" height="100vh" sx={{ bgcolor: '#fafafa' }}>
      <Box width={sidebarWidth}>
        <Sidebar pathname={pathname} profile={profile} navList={navList} />
      </Box>
      <Box sx={{ width: `calc(100% - ${sidebarWidth}px)` }}>
        <Stack sx={{ overflow: 'auto', height: '100vh' }}>
          <Header profile={profile} logout={() => dispatch(authActions.logout())} />
          <Box flexGrow={1}>{children}</Box>
        </Stack>
      </Box>
    </Stack>
  )
}
