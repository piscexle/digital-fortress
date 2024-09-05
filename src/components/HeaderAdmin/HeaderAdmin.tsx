import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Button, Popover, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { setTokenAuth, setUserAuth } from '@/store/auth/auth.reducer';
import { createToast } from '@/store/notification/notification.reducer';
import { createRGBDataURL } from '@/utils/createRGBDataURL';
import Image from 'next/image';
import ResetPassword from './AuthMe/ResetPassword';
import AppConfirmModal from '../AppConfirmModal/AppConfirmModal';
import {
  ADMIN_PATH,
  AppConfirmModalEnum,
  NO_IMAGE,
  NotificationTypeEnum,
} from '../../config/constant';
import './header.scss';
import FormUpdateProfile from './AuthMe/FormUpdateProfile';

const { Header } = Layout;

type Props = {
  collapsed: boolean;
  onChangeCollapseHeader: () => void;
};

function HeaderAdmin({ collapsed, onChangeCollapseHeader }: Props) {
  const { user } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [openModalUpdateProfile, setOpenModalUpdateProfile] = useState<boolean>(false);
  const [resetPasswordModalVisible, setShowResetPasswordModal] = useState<boolean>(false);
  const [confirmLogoutVisible, setShowConfirmLogoutVisible] = useState<boolean>(false);
  const [info, setInfo] = useState({
    role: '',
    email: '',
    avatar: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    setInfo({
      role: user.role as string,
      email: user.email,
      avatar: user.avatar,
      firstName: user.firstName as string,
      lastName: user.lastName as string,
    });
  }, [user.role, user.email, user.lastName, user.firstName, user.avatar]);

  const onLogoutClicked = () => {
    setShowConfirmLogoutVisible(true);
  };

  return (
    <>
      <Header
        className={`${'customize-header-admin'} ${collapsed ? 'collapsed-header-admin' : ''}`}
      >
        <div className="header-action-admin">
          <Button
            className="customize-btn-collapsed"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onChangeCollapseHeader}
          />
        </div>
        <div className="exchange-rate">
          {/* Tỷ giá hôm nay: {formatCurrency(vietcombank.data, 'vi')} */}
        </div>
        <div>
          <Popover
            content={
              <Space direction="vertical">
                <Button
                  type="link"
                  style={{ width: '180px', color: '#066156' }}
                  onClick={() => setOpenModalUpdateProfile(true)}
                >
                  Thông tin cá nhân
                </Button>
                <Button
                  type="link"
                  style={{ width: '180px', color: '#066156' }}
                  onClick={() => setShowResetPasswordModal(true)}
                >
                  Cập nhật mật khẩu
                </Button>
                <Button type="primary" style={{ width: '180px' }} onClick={() => onLogoutClicked()}>
                  Đăng xuất
                </Button>
              </Space>
            }
          >
            <div className="wrapper-profile-admin">
              <div className="wrapper-profile-admin-avatar-image">
                <Image
                  fill
                  placeholder="blur"
                  blurDataURL={createRGBDataURL(199, 199, 199)}
                  src={user.avatar || NO_IMAGE}
                  alt=""
                  sizes="100%"
                />
              </div>
              <div className="wrapper-profile-admin-text">
                <p className="wrapper-profile-admin-text-name">{`${info.firstName} ${info.lastName}`}</p>
                <span className="wrapper-profile-admin-text-role">{info?.role}</span>
              </div>
            </div>
          </Popover>
        </div>
      </Header>
      <FormUpdateProfile
        setOpenModalUpdate={setOpenModalUpdateProfile}
        openModalUpdate={openModalUpdateProfile}
      />
      <ResetPassword
        resetPasswordModalVisible={resetPasswordModalVisible}
        setShowResetPasswordModal={setShowResetPasswordModal}
      />
      <AppConfirmModal
        isVisible={confirmLogoutVisible}
        type={AppConfirmModalEnum.warning}
        title="Đăng Xuất"
        okTextButton="Đăng Xuất"
        onCancel={() => {
          setShowConfirmLogoutVisible(false);
        }}
        loading={loading}
        onOk={async () => {
          await setLoading(true);
          await dispatch(
            setUserAuth({
              id: '',
              createdAt: '',
              updatedAt: '',
              deletedAt: null,
              role: '',
              email: '',
              firstName: null,
              lastName: null,
              avatar: '',
              phoneNumber: '',
            })
          );
          await dispatch(
            setTokenAuth({
              expiresIn: 0,
              accessToken: '',
              refreshToken: '',
            })
          );
          await dispatch(
            createToast({
              id: uuidv4(),
              status: NotificationTypeEnum.success,
              message: 'Đăng xuất thành công',
              description: '',
            })
          );
          await setLoading(false);
          router.push(ADMIN_PATH.auth.login, { scroll: false });
        }}
      />
    </>
  );
}

export default HeaderAdmin;
