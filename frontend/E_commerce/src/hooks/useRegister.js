import { useState } from 'react'
import { registerUser } from '@api/auth'

export function useRegister() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const register = async (userData) => {
    setLoading(true)
    setError(null)
    try {
      const res = await registerUser(userData)
      return {
        success: true,
        message: 'Account created successfully!',
        data: res,
      }
    } catch (err) {
      const msg = err?.message || 'Registration failed'
      setError(msg)

      return { success: false, message: msg }
    } finally {
      setLoading(false)
    }
  }

  return { register, loading, error }
}
