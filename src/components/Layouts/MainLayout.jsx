import { authActions, getMe } from '@/stores/slices/authSlice'
import { Box, LinearProgress, Stack } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { Header } from '../Common/Header'
import Sidebar from '../Common/SideBar'
import { notificationSound, STATUS } from '@/constants/common'
import { employeeGetActive } from '@/stores/slices/employeeSlice'
import GroupIcon from '@mui/icons-material/Group'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import { notificationActions } from '@/stores/slices/notificationSlice'
import socket from '@/utils/socket'
import { taskGetAll } from '@/stores/slices/taskSlice'
import { toast } from 'react-toastify'
import { messageAction } from '@/stores/slices/messageSlice'

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

  const { status, profile, token } = useSelector((state) => state.auth)
  const { filter } = useSelector((state) => state.task)
  const { data: messageList } = useSelector((state) => state.message)

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

  useEffect(() => {
    const handleNewMessage = (msg) => {
      dispatch(messageAction.setData([...messageList, msg]))

      if (msg?.createdBy !== profile?.id) {
        dispatch(notificationActions.incrementMessage())
        notificationSound.play()
      }
    }

    socket.on('newMessage', handleNewMessage)

    return () => {
      socket.off('newMessage', handleNewMessage)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageList])

  useEffect(() => {
    if (!socket || !profile?.id) return

    socket.emit('joinRoom', profile.id)

    const handleTaskAssigned = () => {
      dispatch(notificationActions.incrementTask())
      notificationSound.play()
      dispatch(taskGetAll(filter))
      toast.warning('Something had changed')
    }

    socket.on('task-assigned', handleTaskAssigned)

    return () => {
      socket.off('task-assigned', handleTaskAssigned)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id])

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
        <Stack sx={{ height: '100vh', overflow: 'hidden' }}>
          <Header profile={profile} logout={() => dispatch(authActions.logout())} />
          <Box flexGrow={1}>{children}</Box>
        </Stack>
      </Box>
    </Stack>
  )
}
