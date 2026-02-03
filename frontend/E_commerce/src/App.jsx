import { createBrowserRouter, RouterProvider } from 'react-router'
import { AuthLayout, MainLayout } from '@layouts'
import { ProtectedRoute , GuestRoute} from '@routes'

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
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password', element: <ResetPassword /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
