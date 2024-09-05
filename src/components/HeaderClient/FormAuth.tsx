import { NotificationTypeEnum } from '@/config/constant';
import { useAppDispatch } from '@/store';
import {
  doSendMailForgotPasswordAction,
  loginAction,
  registerAction,
} from '@/store/auth/auth.action';
import { setTypeLogin } from '@/store/auth/auth.reducer';
import { createToast } from '@/store/notification/notification.reducer';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import GoogleColorIcon from '../Icons/GoogleColorIcon';
// import FacebookColorIcon from '../Icons/FacebookColorIcon';
import CheckFillIcon from '../Icons/CheckFillIcon';
import './header.scss';

interface Props {
  typeForm: string;
  onCancelModal?: () => void;
}

const FormAuth = ({ typeForm, onCancelModal }: Props) => {
  const [formRef] = Form.useForm();
  const [formForgotPasswordRef] = Form.useForm();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [isFormForgotPassword, setIsFormForgotPassword] = useState<boolean>(false);
  const [sendMailSuccess, setSendMailSuccess] = useState<boolean>(false);

  const showToast = (status_: NotificationTypeEnum, message: string) => {
    const toast = {
      id: uuidv4(),
      status: status_,
      message,
      description: '',
    };
    dispatch(createToast(toast));
  };

  useEffect(() => {
    const handleCancel = () => {
      setIsFormForgotPassword(false);
    };

    if (onCancelModal) {
      handleCancel();
    }
  }, [onCancelModal]);

  useEffect(() => {
    setSendMailSuccess(false);
    const isForgotPasswordVisible = document.querySelector('.wrapper-form-forgot-password');

    const wrapperAuthTabs = document.querySelector('.wrapper-auth-tabs') as HTMLElement;

    if (isForgotPasswordVisible) {
      if (wrapperAuthTabs) {
        wrapperAuthTabs.style.display = 'none';
      }
    } else if (wrapperAuthTabs) {
      wrapperAuthTabs.style.display = 'flex';
    }
  }, [isFormForgotPassword]);

  const popupCenter = (url: string, title: string) => {
    const dualScreenLeft = window.screenLeft || window.screenX || 0;
    const dualScreenTop = window.screenTop || window.screenY || 0;

    const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width;
    const height =
      window.innerHeight || document.documentElement.clientHeight || window.screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 650) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${650 / systemZoom},height=${650 / systemZoom},top=${top},left=${left}`
    );

    if (newWindow) {
      newWindow.focus();
    }
  };

  const onFinishLoginOrRegister = async (values: any) => {
    setLoading(true);
    dispatch(setTypeLogin('normal'));

    const action =
      typeForm === 'login'
        ? loginAction(values)
        : registerAction({
            gender: values.gender || 'MALE',
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          });
    const res: any = await dispatch(action);
    if (res.payload?.error) {
      setLoading(false);
      showToast(NotificationTypeEnum.error, res.payload.error);
    }

    setLoading(false);
  };

  const onFinishForgotPassword = async (values: any) => {
    setLoading(true);
    const res: any = await dispatch(doSendMailForgotPasswordAction(values.email));
    if (res.payload?.messageCode) {
      setSendMailSuccess(true);
    } else if (res.payload.error === 'USER_NOT_FOUND') {
      showToast(NotificationTypeEnum.error, 'Không tìm thấy email này!');
    } else {
      showToast(NotificationTypeEnum.error, 'Đã xãy ra lỗi, vui lòng thử lại!');
    }
    setLoading(false);
  };

  const loginWithGoogle = async () => {
    dispatch(setTypeLogin('google'));
    await popupCenter('/login-with-google', 'Sample Sign In');
  };

  return (
    <div className="wrapper-auth-client">
      {!isFormForgotPassword && (
        <Form
          name="form-auth-login-and-register-client"
          layout="vertical"
          form={formRef}
          onFinish={onFinishLoginOrRegister}
          className={typeForm === 'register' ? 'customize-form-full' : 'customize-form'}
          initialValues={{
            gender: 'MALE',
          }}
        >
          {typeForm === 'register' && (
            <>
              <Form.Item name="gender">
                <Select placeholder="Giới tính" size="large">
                  <Select.Option value="MALE">Nam</Select.Option>
                  <Select.Option value="FEMALE">Nữ</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: 'Nhập tên của bạn!' }]}
              >
                <Input
                  placeholder={typeForm === 'register' ? 'Tên' : ''}
                  size="large"
                  className="customize-input"
                />
              </Form.Item>
              <Form.Item name="lastName" rules={[{ required: true, message: 'Nhập họ của bạn!' }]}>
                <Input
                  placeholder={typeForm === 'register' ? 'Họ' : ''}
                  size="large"
                  className="customize-input"
                />
              </Form.Item>
            </>
          )}
          <Form.Item
            name="email"
            label={typeForm !== 'register' && 'Địa chỉ Email'}
            rules={[{ required: true, message: 'Nhập địa chỉ email!' }]}
          >
            <Input
              placeholder={typeForm === 'register' ? 'Địa chỉ Email' : ''}
              size="large"
              className="customize-input"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={typeForm !== 'register' && 'Mật khẩu'}
            rules={[
              { required: true, message: 'Nhập mật khẩu!' },
              typeForm === 'register'
                ? {
                    required: true,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g,
                    message:
                      'Vui lòng nhập mật khẩu có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số!',
                  }
                : {},
            ]}
          >
            <Input.Password placeholder={typeForm === 'register' ? 'Mật khẩu' : ''} size="large" />
          </Form.Item>
          {typeForm === 'register' && (
            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Nhập xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu mới của bạn không khớp'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Xác nhận mật khẩu" size="large" />
            </Form.Item>
          )}
          <Form.Item className="form-item-btn">
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              {typeForm === 'login' ? 'Đăng nhập' : 'Tham gia '}
            </Button>
          </Form.Item>
          {typeForm === 'login' && (
            <Button
              type="link"
              block
              className="text-forgot-password"
              onClick={() => {
                setIsFormForgotPassword(true);
              }}
            >
              Quên mật khẩu
            </Button>
          )}

          <p className="text-register-with">Hoặc đăng nhập với</p>
          <div className="wrapper-login-with-social">
            <Button icon={<GoogleColorIcon />} onClick={loginWithGoogle}>
              Google
            </Button>
            {/* <Button icon={<FacebookColorIcon />} onClick={loginWithFacebook}>
              Facebook
            </Button> */}
          </div>
        </Form>
      )}
      {isFormForgotPassword && (
        <div className="wrapper-form-forgot-password">
          {typeForm === 'login' && (
            <div className="wrapper-form-forgot-password-head">
              <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                onClick={() => {
                  setIsFormForgotPassword(false);
                }}
              />
              <p>Quên mật khẩu?</p>
            </div>
          )}
          {!sendMailSuccess && (
            <Form
              name="form-auth-forgot-client"
              layout="vertical"
              form={formForgotPasswordRef}
              onFinish={onFinishForgotPassword}
              className="customize-form-full"
            >
              <p className="wrapper-form-forgot-password-des">
                Vui lòng nhập địa chỉ email bạn đã sử dụng để tạo tài khoản và chúng tôi sẽ gửi cho
                bạn hướng dẫn đặt lại mật khẩu.
              </p>
              <Form.Item
                name="email"
                label="Địa chỉ Email"
                rules={[{ required: true, message: 'Nhập địa chỉ email!' }]}
              >
                <Input placeholder="Địa chỉ Email" size="large" className="customize-input" />
              </Form.Item>
              <Form.Item className="form-item-btn">
                <Button type="primary" htmlType="submit" loading={loading} block size="large">
                  Gửi
                </Button>
              </Form.Item>
            </Form>
          )}
          {sendMailSuccess && (
            <div className="wrapper-form-forgot-password-success">
              <CheckFillIcon />
              <p className="wrapper-form-forgot-password-note">
                Cảm ơn bạn đã yêu cầu. Chúng tôi đã gửi email cho bạn. Vui lòng kiểm tra hộp thư
                đến, thư rác để tìm email. Nếu bạn không nhận được email thì có thể tài khoản của
                bạn chưa được đăng ký bằng địa chỉ email này.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormAuth;
