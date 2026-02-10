import { useState } from 'react'
import { loginUser } from '@api/auth'

export function useLogin() {
  const [loading, setLoading] = useState(false)

  const login = async ({ email, password }) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Artificial delay for better UX
      const res = await loginUser({ email, password })
      return { ...res, error: null }
    } catch (err) {
      console.log('Login error:', err)
      return { success: false, message: err?.response?.data?.message || err.message || 'Login failed', error: err }
    } finally {
      setLoading(false)
    }
  }

  return { login, loading }
}
