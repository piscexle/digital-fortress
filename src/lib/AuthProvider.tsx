'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

const AuthProvider = ({ children }: React.PropsWithChildren) => <SessionProvider>{children}</SessionProvider>;

export default AuthProvider;
