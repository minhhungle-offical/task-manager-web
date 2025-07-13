import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import AccountCircle from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'
import { Avatar } from '@mui/material'

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

export function Header({ profile }) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (pathname) => {
    handleMenuClose()
    navigate(pathname)
  }

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
        <MenuItem key={label} onClick={() => handleMenuItemClick(pathname)}>
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

          <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            {profile && profile.avatarUrl ? (
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
