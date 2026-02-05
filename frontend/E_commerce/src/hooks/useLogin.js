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
      const res = await loginUser({ email, password })
      setLoading(false)
      return res
    } catch (err) {
      setLoading(false)
      setError(err.message)
      return null
    }
  }

  return { login, loading, error }
}
