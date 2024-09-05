'use client';

import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

function Error({ error, reset }: { error: Error; reset: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  useEffect(() => {
    if (error.message.length > 0) {
      setIsModalOpen(true);
    }
  }, [error]);

  const handleOk = () => {
    reset();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="System Error"
      centered
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button danger key="submit" type="primary" onClick={handleOk}>
          Retry
        </Button>,
      ]}
    >
      <p className="error-title">The system is developing</p>
      <p className="error-title">Please try again in a few minutes. </p>
    </Modal>
  );
}

export default Error;
