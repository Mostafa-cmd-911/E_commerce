import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = false

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  return children
}
