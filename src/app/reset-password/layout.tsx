import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Đặt lại mật khẩu',
  description: 'Đặt lại mật khẩu',
};

const ResetPasswordLayout = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export default ResetPasswordLayout;
