import { STORAGE_KEYS } from '@constants/storageKeys'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem(STORAGE_KEYS.USER_TOKEN)

  if (!token) {
    return <Navigate to="/auth/login" replace />
  }

  return children
}
