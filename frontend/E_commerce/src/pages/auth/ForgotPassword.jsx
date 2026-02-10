import React from 'react';
import { ForgotPasswordForm } from '@components';
import { Typography, Box } from '@mui/material';
import { LockReset } from '@mui/icons-material';

export function ForgotPassword() {
  return (
    <main className="bg-background-dark flex min-h-[81vh] flex-1 items-center justify-center px-4 pt-10 pb-6">
      <div className="bg-card-dark w-full max-w-120 rounded-xl border border-white/5 p-8 shadow-xl md:p-10">
        {/* Header */}
        <Box className="text-center mb-8">
          <Box className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10! border! border-primary/20! mb-6">
            <LockReset className="text-primary!" size={32} />
          </Box>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '24px', sm: '28px' },
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              mb: 2,
            }}
          >
            Forgot Password
          </Typography>
          <Typography
            variant="body1"
            align="center"
            className="text-slate-400"
            sx={{
              fontSize: '16px',
              lineHeight: 1.6,
            }}
          >
            Enter your email address and we'll send you a link to reset your password.
          </Typography>
        </Box>

        {/* Form */}
        <ForgotPasswordForm />
      </div>
    </main>
  );
}