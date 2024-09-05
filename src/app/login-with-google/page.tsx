'use client';

import { useAppDispatch } from '@/store';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

const SignInPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!(status === 'loading')) signIn('google', {});
    if (session) {
      window.close();
    }
  }, [session, status, dispatch]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        left: 0,
        top: 0,
        background: 'white',
      }}
    />
  );
};

export default SignInPage;
