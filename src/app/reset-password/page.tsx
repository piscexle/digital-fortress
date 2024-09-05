'use client';

import { MainClient } from '@/layouts/MainClient';
import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import './style.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/store';
import {
  resetPasswordWithTokenAction,
  verifyTokenForgotPasswordAction,
} from '@/store/auth/auth.action';
import { createToast } from '@/store/notification/notification.reducer';
import { v4 as uuidv4 } from 'uuid';
import { NotificationTypeEnum } from '@/config/constant';

const ResetPasswordPage = () => {
  const [formRef] = Form.useForm();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [showEnterPassword, setShowEnterPassword] = useState<boolean>(false);
  const token = (searchParams.get('token') as string).replaceAll(' ', '+');

  const showToast = (status: NotificationTypeEnum, message: string) => {
    const toast = {
      id: uuidv4(),
      status,
      message,
      description: '',
    };
    dispatch(createToast(toast));
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    const res = await dispatch(
      resetPasswordWithTokenAction({
        token: token as string,
        newPassword: values.newPassword,
      })
    );
    if (res.payload.error) {
      if (res.payload.error === 'PASSWORD_USED') {
        setLoading(false);
        showToast(NotificationTypeEnum.error, 'Mật khẩu mới đã được sử dụng!');
        return;
      }
      showToast(NotificationTypeEnum.error, 'Thay đổi mật khẩu thất bại.');
    } else {
      showToast(NotificationTypeEnum.success, 'Thay đổi mật khẩu thành công.');
      router.push('/');
    }
    setLoading(false);
  };

  useEffect(() => {
    dispatch(verifyTokenForgotPasswordAction(token || '')).then((res) => {
      if (res.payload.error) {
        showToast(NotificationTypeEnum.error, 'Đã xãy ra lỗi, vui lòng thử lại!');
        router.push('/');
      } else {
        setShowEnterPassword(true);
      }
    });
  }, []);

  return (
    <MainClient>
      <div className="container">
        {showEnterPassword && (
          <div className="wrapper-form-reset-password">
            <p className="wrapper-form-reset-password-title">Đặt lại mật khẩu?</p>
            <Form
              name="form-auth-forgot-client"
              layout="vertical"
              form={formRef}
              onFinish={onFinish}
            >
              <Form.Item
                name="newPassword"
                label="Mật khẩu mới"
                rules={[
                  { required: true, message: 'Nhập mật khẩu mới của bạn!' },
                  {
                    required: true,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g,
                    message:
                      'Vui lòng nhập mật khẩu có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số!',
                  },
                ]}
              >
                <Input.Password
                  placeholder="Mật khẩu mới"
                  size="large"
                  // className="customize-input"
                />
              </Form.Item>
              <Form.Item
                name="confirmNewPassword"
                dependencies={['newPassword']}
                label="Xác nhận mật khẩu mới"
                rules={[
                  { required: true, message: 'Nhập xác nhận mật khẩu mới của bạn!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu mới của bạn không khớp'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Xác nhận mật khẩu mới" size="large" />
              </Form.Item>
              <Form.Item className="form-item-btn">
                <Button type="primary" htmlType="submit" loading={loading} block size="large">
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </MainClient>
  );
};

export default ResetPasswordPage;
