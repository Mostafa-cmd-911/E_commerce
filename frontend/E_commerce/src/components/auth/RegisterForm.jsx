import { useReducer, useMemo } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { PasswordField } from '@components'

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
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isFormValid) {
      dispatch({
        type: 'SHOW_TOAST',
        message: 'Please fill all fields correctly',
      })
      return
    }

    // When the form isValid, you can call the API to register the user

    // call API

    dispatch({
      type: 'SHOW_TOAST',
      message: 'Account created successfully!',
      severity: 'success',
    })

    console.log('Form submitted:', { fullName, email, password })
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
            // disabled={!isFormValid}
            sx={{
              height: 56,
              fontWeight: 700,
              fontSize: '16px',
            }}
          >
            Sign Up
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
