import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '404',
  description: '404',
};

const NotFoundLayout = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export default NotFoundLayout;
