import {
  alpha,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

export default function Sidebar({ navList, pathname, sidebarWidth = 250 }) {
  return (
    <Box
      boxShadow={1}
      sx={{
        width: sidebarWidth,
        height: '100vh',
        borderRight: '1px solid #e0e0e0',
        p: 1.5,
        bgcolor: 'white',
      }}
    >
      <List>
        <Typography
          variant="h5"
          noWrap
          component={Link}
          to="/"
          sx={{
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'primary.main',
            textDecoration: 'none',
          }}
        >
          TASKS MANAGER
        </Typography>
      </List>

      <List>
        {navList
          .filter((i) => i.hasPermission)
          .map((item) => {
            const isActive = pathname.startsWith(item.path)
            return (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={isActive}
                  sx={{
                    borderRadius: 0,
                    mb: 1,
                    color: isActive ? 'primary.main' : 'text.primary',
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                    },
                    '&.Mui-selected': {
                      borderRight: '3px solid',
                      borderColor: 'primary.main',
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      fontWeight: 600,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? 'primary.main' : 'text.secondary',
                      minWidth: 36,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            )
          })}
      </List>
    </Box>
  )
}
