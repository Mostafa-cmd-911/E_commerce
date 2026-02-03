import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import { AuthLayout, MainLayout } from '@layouts'
import { ProtectedRoute, GuestRoute } from '@routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <>
            {/* <Home /> */}
            home
          </>
        ),
      },
      {
        path: 'shop',
        element: (
          <>
            {/* <Shop /> */}
            Shop
          </>
        ),
      },
      {
        path: 'profile',
        element: <ProtectedRoute>{/* <Profile /> */}</ProtectedRoute>,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: 'login',
        element: <GuestRoute>{/* <Login /> */}</GuestRoute>,
      },
      {
        path: 'register',
        element: <GuestRoute>{/* <Register /> */}</GuestRoute>,
      },
      {
        path: 'forgot-password',
        element: <GuestRoute>{/* <ForgotPassword /> */}</GuestRoute>,
      },
      {
        path: 'reset-password',
        element: <GuestRoute>{/* <ResetPassword /> */}</GuestRoute>,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
