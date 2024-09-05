'use client';

import React, { useState } from 'react';
import { Modal, notification } from 'antd';
import { ResetPasswordModel } from '@/store/auth/auth.type';
import { resetPasswordByEmailAction } from '@/store/auth/auth.action';
import { useAppDispatch } from '@/store';
import { NotificationTypeEnum } from '@/config/constant';
import FormRestPassword from './FormResetPassword';

interface IProps {
  resetPasswordModalVisible: boolean;
  setShowResetPasswordModal: (v: boolean) => void;
}

function ResetPassword(props: IProps) {
  const dispatch = useAppDispatch();
  const { resetPasswordModalVisible, setShowResetPasswordModal } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const onSubmitted = async (value: ResetPasswordModel) => {
    setIsLoading(true);
    const response = await dispatch(resetPasswordByEmailAction(value));
    if (response.meta.requestStatus === 'rejected') {
      setIsLoading(false);
      api[NotificationTypeEnum.error]({
        message: 'Cập nhật mật khẩu thất bại, Vui lòng thử lại sau.',
        description: '',
      });
    } else {
      setIsLoading(false);
      setShowResetPasswordModal(false);
      api[NotificationTypeEnum.success]({
        message: 'Cập nhật mật khẩu thành công',
        description: '',
      });
    }
  };

  return (
    <Modal
      centered
      title="Cập nhật mật khẩu"
      open={resetPasswordModalVisible}
      closable={false}
      footer={null}
    >
      {contextHolder}
      <div className="wrapper-table-admin">
        <FormRestPassword
          onCancel={() => setShowResetPasswordModal(false)}
          onSubmitted={(value) => onSubmitted(value)}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </Modal>
  );
}

export default ResetPassword;
