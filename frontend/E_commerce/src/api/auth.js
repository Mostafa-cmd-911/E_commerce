import axios from 'axios'

// create a reusable axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Registration function
export async function registerUser({ fullName, email, password }) {
  try {
    // send POST request to backend register endpoint
    const response = await api.post('/users/register', {
      name: fullName,
      email,
      password,
    })

    return response.data
  } catch (error) {
    if (error.response) {
      // backend error response handling
      throw new Error(error.response.data.message || 'Registration failed')
    }

    // if request failed before reaching server (network error, CORS issue, etc)
    throw new Error('Network error — try again')
  }
}

// Login function
export async function loginUser({ email, password }) {
  try {
    // send login request to backend
    const response = await api.post('/users/login', {
      email,
      password,
    })

    return response.data
  } catch (error) {
    // backend error response handling
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed')
    }

    // network / unknown error
    throw new Error('Network error — try again')
  }
}
