import * as React from 'react';
import { GuestGuard } from 'src/components/auth/guest-guard';
import { Layout } from 'src/components/auth/layout';
import { SignUpForm } from 'src/components/auth/sign-up-form';

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <GuestGuard>
        <SignUpForm />
      </GuestGuard>
    </Layout>
  );
}
