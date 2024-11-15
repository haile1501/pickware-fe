import * as React from 'react';
import { GuestGuard } from 'src/components/auth/guest-guard';
import { Layout } from 'src/components/auth/layout';
import { ResetPasswordForm } from 'src/components/auth/reset-password-form';

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <GuestGuard>
        <ResetPasswordForm />
      </GuestGuard>
    </Layout>
  );
}
