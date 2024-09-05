import React, { useEffect, useState } from 'react';
import { NotificationTypeEnum } from '@/config/constant';
import { useAppDispatch, useAppSelector } from '@/store';
import { getUserInfoAction, patchUserInfoAction } from '@/store/auth/auth.action';
import { createToast } from '@/store/notification/notification.reducer';
import { deleteUploadImageAction, postUploadImageAction } from '@/store/upload/upload.action';
import { encryptCloudMediaKey } from '@/utils/encryptCloudMediaKey';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Space, Upload, UploadProps } from 'antd';
import Image from 'next/image';

import { v4 as uuidv4 } from 'uuid';

type Props = {
  openModalUpdate: boolean;
  setOpenModalUpdate: (v: boolean) => void;
};

const FormUpdateProfile = (prop: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { user, loading, token } = useAppSelector((state) => state.authSlice);
  const loadingUpload = useAppSelector((state) => state.uploadSlice);
  const [avatar, setAvatar] = useState('');
  const { openModalUpdate, setOpenModalUpdate } = prop;

  const props: UploadProps = {
    async customRequest({ file }) {
      const res = await dispatch(
        postUploadImageAction({
          key: encryptCloudMediaKey(),
          file: file as File,
        })
      );
      setAvatar(res.payload.data.result);
    },
    showUploadList: false,
    fileList: [],
  };

  const removeImage = async () => {
    await dispatch(
      deleteUploadImageAction({
        key: encryptCloudMediaKey(),
        id: avatar,
      })
    );
    setAvatar('');
  };

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
    const res: any = await dispatch(
      patchUserInfoAction({
        firstName: values.firstName,
        lastName: values.lastName,
        avatar,
        phoneNumber: values.phoneNumber,
        address: values.address,
      })
    );
    if (res.payload?.messageCode) {
      showToast(NotificationTypeEnum.success, 'Cập nhật thông tin thành công');
      dispatch(getUserInfoAction());
      setOpenModalUpdate(false);
    } else {
      showToast(NotificationTypeEnum.error, 'Cập nhât thông tin thất bại');
    }
  };

  useEffect(() => {
    if (Object.values(token).every((value) => value !== '')) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        avatar: user.avatar,
      });
      setAvatar(user.avatar as string);
    }
  }, [user, form, token]);

  return (
    <Modal centered title="Thông tin cá nhân" open={openModalUpdate} closable={false} footer={null}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col xl={12} md={12}>
            <Form.Item
              name="firstName"
              label="Họ"
              rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
              wrapperCol={{ span: 22 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              wrapperCol={{ span: 22 }}
              name="lastName"
              label="Tên"
              rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="email" label="Email" wrapperCol={{ span: 22 }}>
              <Input disabled />
            </Form.Item>

            <Form.Item name="phoneNumber" label="Số điện thoại" wrapperCol={{ span: 22 }}
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xl={10} md={10}>
            <Form.Item name="avarar" label="Ảnh đại diện">
              {avatar ? (
                <div style={{ position: 'relative' }}>
                  <Image
                    width={160}
                    height={160}
                    src={avatar}
                    alt=""
                    style={{ borderRadius: '50%' }}
                  />
                  <div style={{ position: 'absolute', top: 0, left: 165 }}>
                    <Button danger icon={<CloseOutlined />} onClick={removeImage} />
                  </div>
                </div>
              ) : (
                <Upload {...props}>
                  <Button icon={<UploadOutlined />} loading={loadingUpload.load}>
                    Chọn ảnh
                  </Button>
                </Upload>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Space
          className="btn-update-profile"
          style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}
        >
          <Button onClick={() => setOpenModalUpdate(false)}>Quay lại</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};
export default FormUpdateProfile;
