import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'

export function NavLinks({ links }) {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto', gap: 4 }}>
      {links.map((link) => (
        <NavLink
          key={link.label}
          to={link.to}
          end={link.end || false}
          style={({ isActive }) => ({
            position: 'relative',
            fontWeight: 600,
            color: isActive ? '#3625f4' : '#334155',
          })}
          className="!hover:text-primary transition-colors! dark:text-zinc-300! dark:hover:text-primary!"
        >
          {link.label}
        </NavLink>
      ))}
    </Box>
  )
}
