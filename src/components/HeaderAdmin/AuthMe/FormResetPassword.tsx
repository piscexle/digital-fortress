import React, { useEffect } from 'react';
import { NotificationTypeEnum } from '@/config/constant';
import { useAppSelector } from '@/store';
import { ResetPasswordModel } from '@/store/auth/auth.type';
import { LockOutlined } from '@ant-design/icons';
import {
  Form, Input, Space, Button, notification,
} from 'antd';

interface IProps {
  onCancel: () => void;
  onSubmitted: (v: ResetPasswordModel) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}
function FormRestPassword(props: IProps) {
  const { user } = useAppSelector((state) => state.authSlice);
  const {
    onCancel, onSubmitted, isLoading, setIsLoading,
  } = props;
  const [formRef] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (message: string) => {
    api[NotificationTypeEnum.error]({
      message,
      description: '',
    });
  };

  useEffect(() => {
    formRef.resetFields();
  });

  const onFinish = (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      openNotificationWithIcon(
        'Nhập lại mật khẩu không chính xác. Vui lòng thử lại!',
      );
      return;
    }
    setIsLoading(true);
    onSubmitted({
      email: user.email,
      newPassword: values.newPassword,
      oldPassword: values.oldPassword,
    });
  };

  const onReset = () => {
    formRef.resetFields();
    onCancel();
  };

  return (
    <Form layout="vertical" form={formRef} onFinish={onFinish}>
      {contextHolder}
      <Form.Item
        name="oldPassword"
        label="Mật khẩu cũ"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
      >
        <Input.Password
          type="password"
          placeholder="Mật khẩu"
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label="Mật khẩu mới"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
      >
        <Input.Password
          type="password"
          placeholder="Mật khẩu"
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Xác thực mật khẩu mới"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
      >
        <Input.Password
          type="password"
          placeholder="Mật khẩu"
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: '0px' }}>
        <Space
          style={{ display: 'flex', width: '100%', justifyContent: 'end' }}
        >
          <Button type="primary" ghost onClick={onReset} disabled={isLoading}>
            Huỷ
          </Button>

          <Button type="primary" htmlType="submit" loading={isLoading}>
            Xác nhận
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default FormRestPassword;
