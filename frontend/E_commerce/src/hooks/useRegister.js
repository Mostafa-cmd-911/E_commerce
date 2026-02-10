import { useState } from 'react'
import { registerUser } from '@api/auth'

export function useRegister() {
  const [loading, setLoading] = useState(false)

  const register = async (userData) => {
    setLoading(true)
    try {
      const res = await registerUser(userData)
      return {
        success: true,
        message: 'Account created successfully!',
        data: res,
      }
    } catch (err) {
      return {
        success: false,
        message:
          err?.response?.data?.message || err?.message || 'Registration failed - try again',
        error: err,
      }
    } finally {
      setLoading(false)
    }
  }

  return { register, loading }
}
