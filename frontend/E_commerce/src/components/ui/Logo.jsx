import { Box, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export function Logo() {
  return (
    <Box
      component={RouterLink}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        textDecoration: 'none',
      }}
    >
      {/* SVG Icon */}
      <Box sx={{ width: 32, height: 32 }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="#f0f7ff"
            stroke="#2563eb"
            strokeWidth="2"
          />
          <g transform="translate(100, 100)">
            <path
              d="M -35 -10 L -40 30 Q -40 45 -25 45 L 25 45 Q 40 45 40 30 L 35 -10 Z"
              fill="#2563eb"
              stroke="#1e40af"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <ellipse
              cx="-15"
              cy="15"
              rx="12"
              ry="20"
              fill="#60a5fa"
              opacity="0.6"
            />
            <path
              d="M -25 -10 Q -35 -35 -10 -40"
              stroke="#2563eb"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 25 -10 Q 35 -35 10 -40"
              stroke="#2563eb"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <g transform="translate(0, 35)">
              <line
                x1="-8"
                y1="8"
                x2="8"
                y2="-8"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="8"
                y1="-8"
                x2="5"
                y2="-2"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="8"
                y1="-8"
                x2="14"
                y2="-5"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          </g>
          <circle cx="40" cy="50" r="3" fill="#f59e0b" opacity="0.7" />
          <circle cx="160" cy="140" r="3" fill="#f59e0b" opacity="0.7" />
          <circle cx="150" cy="60" r="2" fill="#ec4899" opacity="0.6" />
        </svg>
      </Box>

      {/* Logo Text */}
      <Typography variant="h6" fontWeight={800} color="text.primary">
        LUXE
      </Typography>
    </Box>
  )
}
