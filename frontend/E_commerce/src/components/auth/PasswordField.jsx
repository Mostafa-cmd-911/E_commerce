import { useState } from 'react'
import TextField from '@mui/material/TextField'
import PasswordStrengthBar from 'react-password-strength-bar'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'

export function PasswordField({ value, onChange, error }) {
  const [show, setShow] = useState(false)

  return (
    <Box>
      <TextField
        fullWidth
        label="Password"
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        error={error}
        helperText={error ? '8–64 chars, upper, lower, number & symbol' : ''}
        InputProps={{
          maxLength: 64,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShow(!show)}>
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box mt={1.5}>
        <PasswordStrengthBar
          password={value}
          minLength={1}
          height={10}
          shortScoreWord="Start typing"
          scoreWords={['Weak', 'Normal', 'Good', 'Strong', 'Very Strong']}
        />
      </Box>
    </Box>
  )
}
