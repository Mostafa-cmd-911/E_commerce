import { Footer, AuthNavbar } from '@components'
import { Outlet, useLocation } from 'react-router-dom'

export function AuthLayout() {
  const { pathname } = useLocation()

  const isLogin = pathname.includes('login')
  const isRegister = pathname.includes('register')

  return (
    <>
      <AuthNavbar showLogin={!isLogin} showRegister={!isRegister} />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}
