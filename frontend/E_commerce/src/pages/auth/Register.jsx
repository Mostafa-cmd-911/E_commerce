import { RegisterForm } from '@components'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export function Register() {
  return (
    <main className="bg-background-dark flex min-h-[81vh] flex-1 items-center justify-center px-4 pt-10 pb-6">
      <div className="bg-card-dark w-full max-w-130 rounded-xl border border-white/5 p-8 shadow-lg md:p-10">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center">
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '28px', sm: '32px' },
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            Create Account
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            Join our community to start shopping.
          </Typography>
        </div>

        {/* Form */}
        <RegisterForm />

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-primary font-bold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  )
}
