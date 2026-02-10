import { useState } from 'react'
import { loginUser } from '@api/auth'

export function useLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = async ({ email, password }) => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Artificial delay for better UX
      return await loginUser({ email, password })
    } catch (err) {
      setError(err?.message || 'Login failed')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}
