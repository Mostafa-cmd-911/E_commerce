import { useReducer, useMemo, useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import { IconButton, InputAdornment, Box } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useLogin } from '@hooks'
import { useNavigate, Link } from 'react-router-dom'
import { STORAGE_KEYS } from '@constants/storageKeys'

// Reducer function & initial state
const initialState = {
  email: '',
  password: '',
  toast: { open: false, message: '', severity: 'error' },
}

function reducer(state, action) {
  const { type, value, field, message, severity } = action

  switch (type) {
    case 'FIELD_CHANGE':
      return { ...state, [field]: value }
    case 'SHOW_TOAST':
      return {
        ...state,
        toast: { open: true, message: message, severity: severity || 'error' },
      }
    case 'HIDE_TOAST':
      return { ...state, toast: { ...state.toast, open: false } }
    default:
      return state
  }
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)
  const { email, password, toast } = state
  const { login, loading, error } = useLogin()
  const navigate = useNavigate()

  // Validation
  const isEmailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email),
    [email],
  )
  const isPasswordValid = useMemo(() => password.length >= 8, [password])
  const isFormValid = isEmailValid && isPasswordValid

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) {
      dispatch({
        type: 'SHOW_TOAST',
        message: 'Please fill all fields correctly',
      })
      return
    }

    const res = await login({ email, password })
    dispatch({
      type: 'SHOW_TOAST',
      message: res?.message || error || 'Something went wrong',
      severity: res?.success ? 'success' : 'error',
    })

    console.log('Login response:', res)

    if (res?.success) {
      localStorage.setItem(STORAGE_KEYS.USER_TOKEN, res.token)
      navigate('/')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          {/* Email */}
          <TextField
            label="Email Address"
            placeholder="example@gmail.com"
            type="email"
            fullWidth
            value={email}
            error={email.length > 0 && !isEmailValid}
            helperText={
              email.length > 0 && !isEmailValid ? 'Email must be valid' : ''
            }
            onChange={(e) =>
              dispatch({
                type: 'FIELD_CHANGE',
                field: 'email',
                value: e.target.value,
              })
            }
          />

          {/* Forgot Password Link */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} className="-mb-2.5! mt-1!">
            <Link
              to="/auth/forgot-password"
              style={{
                textDecoration: 'none',
                color: '#3625f4',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'color 0.2s',
                margin: '0 0',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#2919c9')}
              onMouseLeave={(e) => (e.target.style.color = '#3625f4')}
            >
              Forgot Password?
            </Link>
          </Box>

          {/* Password */}
          <TextField
            label="Password"
            placeholder="••••••••"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={password}
            error={password.length > 0 && !isPasswordValid}
            helperText={
              password.length > 0 && !isPasswordValid ? 'Min 8 characters' : ''
            }
            onChange={(e) =>
              dispatch({
                type: 'FIELD_CHANGE',
                field: 'password',
                value: e.target.value,
              })
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Submit */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isFormValid || loading}
            sx={{ height: 56, fontWeight: 700, fontSize: '16px' }}
          >
            {loading ? (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress size={20} color="inherit" />
                <span>Logging in...</span>
              </Stack>
            ) : (
              'Login'
            )}
          </Button>
        </Stack>
      </form>

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => dispatch({ type: 'HIDE_TOAST' })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={toast.severity}
          onClose={() => dispatch({ type: 'HIDE_TOAST' })}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  )
}
