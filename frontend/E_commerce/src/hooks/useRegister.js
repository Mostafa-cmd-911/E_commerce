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
      setLoading(false)
      return {
        success: true,
        message: 'Account created successfully!',
        data: res,
      }
    } catch (err) {
      setLoading(false)
      setError(err.message)
      return { success: false, message: err.message }
    }
  }

  return { register, loading, error }
}
