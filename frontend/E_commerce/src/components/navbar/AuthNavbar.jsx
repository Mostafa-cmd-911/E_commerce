import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Toolbar, Box, Button, Container } from '@mui/material'
import { Logo, NavLinks, ThemeToggler } from '@components'

export function AuthNavbar({ showLogin, showRegister }) {
  const navLinks = [
    { label: 'Home', to: '/', end: true },
    { label: 'Shop', to: '/shop' },
    { label: 'About', to: '/about' },
  ]

  return (
    <AppBar
      position="relative"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ px: { xs: 2, md: 6 }, minHeight: 64 }}>
          {/* Logo */}
          <Logo />
          {/* Links */}
          <NavLinks links={navLinks} />

          {/* Right Side */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 4 }}>
            {/* Theme Toggle */}
            <ThemeToggler />

            {/* Login Btn */}
            {showLogin && (
              <Button
                component={RouterLink}
                to="/auth/login"
                variant="outlined"
                className="font-bold! normal-case!"
              >
                Sign In
              </Button>
            )}

            {/* Register Btn */}
            {showRegister && (
              <Button
                component={RouterLink}
                to="/auth/register"
                variant="contained"
                className="bg-primary hover:bg-primary/90 font-bold! normal-case!"
              >
                Sign Up
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
