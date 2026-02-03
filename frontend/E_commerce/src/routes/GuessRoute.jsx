import { Navigate } from 'react-router-dom'

export const GuestRoute = ({ children }) => {
  const isAuthenticated = true

  return isAuthenticated ? <Navigate to="/" replace /> : children
}
