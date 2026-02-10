import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from '@mui/material'
import { Mail, ArrowLeft } from 'lucide-react'
import { CheckCircle } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // TODO: API call to send reset email
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  if (submitted) {
    return (
      <Box className="space-y-4 text-center">
        <Box className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-green-500/20! bg-green-500/10!">
          <CheckCircle sx={{ fontSize: 32, color: '#10b981' }} />
        </Box>
        <Typography variant="h6" className="font-bold">
          Check Your Email
        </Typography>
        <Typography className="text-slate-400">
          We've sent a password reset link to <strong>{email}</strong>
        </Typography>
        <Button
          component={Link}
          to="/auth/login"
          startIcon={<ArrowLeft size={20} />}
          className="mt-6"
          sx={{ textTransform: 'none' }}
        >
          Back to Login
        </Button>
      </Box>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Box>
        <Typography
          component="label"
          htmlFor="email"
          className="mb-2! block! text-sm! font-semibold!"
        >
          Email Address
        </Typography>
        <TextField
          id="email"
          name="email"
          type="email"
          required
          fullWidth
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail size={20} className="text-slate-400" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Button
        type="submit"
        fullWidth
        disabled={loading}
        className="bg-primary hover:bg-primary/90 shadow-primary/20 flex h-12 w-full items-center justify-center gap-2 rounded-lg font-bold text-white shadow-lg transition-all"
        sx={{
          textTransform: 'none',
          height: '48px',
          background: '#3625f4',
          fontWeight: 700,
          '&:hover': {
            background: '#2919c9',
          },
        }}
      >
        {loading ? 'Sending...' : 'Send Reset Link'}
      </Button>

      <Box className="mt-8 border-t border-slate-100 pt-4 dark:border-slate-800/50">
        <Button
          component={Link}
          to="/auth/login"
          startIcon={<ArrowLeft size={20} />}
          fullWidth
          className="hover:text-primary dark:hover:text-primary text-sm font-bold text-slate-500 transition-colors dark:text-slate-400"
          sx={{
            textTransform: 'none',
            color: 'rgb(100, 116, 139)',
            '&:hover': {
              color: '#3625f4',
            },
          }}
        >
          Back to Login
        </Button>
      </Box>
    </form>
  )
}
