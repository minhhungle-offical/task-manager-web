import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import socket from '@/utils/socket'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Avatar } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import audio from '@/assets/audios/audio.mp3'

const settingList = [
  {
    icon: <AccountCircle fontSize="small" />,
    label: 'Profile',
    pathname: '/profile',
  },
  {
    icon: <LogoutIcon fontSize="small" />,
    label: 'Logout',
    pathname: '/logout',
  },
]

export function Header({ profile, logout }) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [unreadCount, setUnreadCount] = useState(0)

  const isMenuOpen = Boolean(anchorEl)
  const notificationSound = new Audio(audio)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSettingClick = (pathname) => {
    handleMenuClose()
    navigate(pathname)
  }

  useEffect(() => {
    if (!socket || !profile?.id) return

    socket.emit('joinRoom', profile.id)

    const handleTaskAssigned = () => {
      notificationSound.currentTime = 0
      notificationSound.play()
      setUnreadCount((prev) => prev + 1)
    }

    socket.on('task-assigned', handleTaskAssigned)

    return () => {
      socket.off('task-assigned', handleTaskAssigned)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id])

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {settingList.map(({ icon, label, pathname }) => (
        <MenuItem
          key={label}
          onClick={() => {
            if (pathname === '/profile') {
              handleSettingClick(pathname)
              return
            }

            logout?.()
          }}
        >
          {icon}
          <Box ml={1}>{label}</Box>
        </MenuItem>
      ))}
    </Menu>
  )

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static" elevation={0} color="inherit" sx={{ bgcolor: 'transparent' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            size="large"
            aria-label="notifications"
            color="inherit"
            onClick={() => setUnreadCount(0)}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            aria-label="account"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            {profile?.avatarUrl ? (
              <Avatar alt={profile.name} src={profile.avatarUrl} sx={{ width: 32, height: 32 }} />
            ) : (
              <AccountCircle />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </Box>
  )
}
