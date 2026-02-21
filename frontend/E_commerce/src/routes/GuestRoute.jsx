import { STORAGE_KEYS } from '@constants/storageKeys'
import { Navigate } from 'react-router-dom'

export const GuestRoute = ({ children }) => {
  const token = localStorage.getItem(STORAGE_KEYS.USER_TOKEN)

  return token ? <Navigate to="/" replace /> : children
}
