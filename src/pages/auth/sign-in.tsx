import * as React from 'react';
import { GuestGuard } from 'src/components/auth/guest-guard';
import { Layout } from 'src/components/auth/layout';
import { SignInForm } from 'src/components/auth/sign-in-form';

const Page = (): React.JSX.Element => {
  return (
    <Layout>
      <GuestGuard>
        <SignInForm />
      </GuestGuard>
    </Layout>
  );
};

export default Page;
