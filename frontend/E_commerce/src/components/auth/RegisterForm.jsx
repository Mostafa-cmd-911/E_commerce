import { useReducer, useMemo } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import { PasswordField } from '@components'
import { useRegister } from '@hooks'
import { useNavigate } from 'react-router-dom'

/* Reducer */
const initialState = {
  fullName: '',
  email: '',
  password: '',
  toast: {
    open: false,
    message: '',
    severity: 'error',
  },
}

function reducer(state, action) {
  const { type, value, field, message, severity } = action

  switch (type) {
    case 'FIELD_CHANGE':
      return {
        ...state,
        [field]: value,
      }

    case 'SHOW_TOAST':
      return {
        ...state,
        toast: {
          open: true,
          message: message,
          severity: severity || 'error',
        },
      }

    case 'HIDE_TOAST':
      return {
        ...state,
        toast: {
          ...state.toast,
          open: false,
        },
      }

    default:
      return state
  }
}

/* RegisterForm Component */
export function RegisterForm() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { fullName, email, password, toast } = state
  const { register, loading, error } = useRegister()
  const navigate = useNavigate()

  /* Password & E-mail validation */
  const isEmailValid = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  }, [email])

  // Checks if password is at least 8 characters long and includes uppercase, lowercase, number, and special character
  const isPasswordValid = useMemo(() => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,64}$/.test(
      password,
    )
  }, [password])

  const isFormValid = useMemo(() => {
    return fullName.trim().length >= 3 && isEmailValid && isPasswordValid
  }, [fullName, isEmailValid, isPasswordValid])

  /* on Submit hendler */
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isFormValid) {
      dispatch({
        type: 'SHOW_TOAST',
        message: 'Please fill all fields correctly',
      })
      return
    }

    try {
      const res = await register({ fullName, email, password })

      // Displaying message from the server or a default one based on the success of the registration
      dispatch({
        type: 'SHOW_TOAST',
        message: res?.message || 'Something went wrong',
        severity: res?.success ? 'success' : 'error',
      })

      // Navigate to home page on successful registration
      if (res?.success) {
        navigate('/')
      }
    } catch (err) {
      // This catch block is a safety net for any unexpected errors that might occur during the registration process
      dispatch({
        type: 'SHOW_TOAST',
        message: err.message || 'Something went wrong',
        severity: 'error',
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          {/* Full Name */}
          <TextField
            label="Full Name"
            placeholder="John Doe"
            fullWidth
            value={fullName}
            error={fullName.length > 0 && fullName.trim().length < 3}
            helperText={
              fullName.length > 0 && fullName.trim().length < 3
                ? 'Full name must be at least 3 characters'
                : ''
            }
            onChange={(e) =>
              dispatch({
                type: 'FIELD_CHANGE',
                field: 'fullName',
                value: e.target.value,
              })
            }
          />

          {/* Email */}
          <TextField
            label="Email Address"
            placeholder="example@gmail.com"
            type="email"
            fullWidth
            value={email}
            error={email.length > 0 && !isEmailValid}
            helperText={
              email.length > 0 && !isEmailValid
                ? 'Email must be like name@example.com'
                : ''
            }
            onChange={(e) =>
              dispatch({
                type: 'FIELD_CHANGE',
                field: 'email',
                value: e.target.value,
              })
            }
          />

          {/* Password */}
          <PasswordField
            value={password}
            onChange={(e) =>
              dispatch({
                type: 'FIELD_CHANGE',
                field: 'password',
                value: e.target.value,
              })
            }
            error={password.length > 0 && !isPasswordValid}
          />

          {/* Submit */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isFormValid || loading}
            sx={{
              height: 56,
              fontWeight: 700,
              fontSize: '16px',
            }}
          >
            {loading ? (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress size={20} color="inherit" />
                <span>Registering...</span>
              </Stack>
            ) : (
              'Sign Up'
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
