'use client';

import React from 'react';
import { MainClient } from '@/layouts/MainClient';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <MainClient>
      <div className="container">
        <Result
          status="404"
          title="404"
          subTitle="No content was found"
          extra={
            <Button type="primary" size="large" onClick={() => router.push('/', { scroll: false })}>
              Home
            </Button>
          }
        />
      </div>
    </MainClient>
  );
};
export default NotFoundPage;
