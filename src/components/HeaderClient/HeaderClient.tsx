'use client';

import React, { useEffect, useState } from 'react';
import './header.scss';
import './tabs.scss';

import { AppConfirmModalEnum, NotificationTypeEnum } from '@/config/constant';
import { useAppDispatch, useAppSelector } from '@/store';
import { setTokenAuth, setUserAuth } from '@/store/auth/auth.reducer';
import { createToast } from '@/store/notification/notification.reducer';
import { createRGBDataURL } from '@/utils/createRGBDataURL';
import { LoginOutlined, MenuOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Button, Drawer, Flex, Input, Popover, Space } from 'antd';
import { SearchProps } from 'antd/es/input';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import AppConfirmModal from '../AppConfirmModal/AppConfirmModal';

export default function HeaderClient() {
  const router = useRouter();
  // const params = useParams();
  const dispatch = useAppDispatch();
  const { user, token, typeLogin } = useAppSelector((state) => state.authSlice);
  const [confirmLogoutVisible, setShowConfirmLogoutVisible] = useState<boolean>(false);
  const [openDrawCatalog, setOpenDrawCatalog] = useState<boolean>(false);

  const [info, setInfo] = useState<any>({});

  useEffect(() => {
    if (Object.values(token).every((value) => value !== '')) {
      setInfo({
        ...user,
        ...token,
      });
    } else {
      setInfo({});
    }
  }, [user, token]);

  const onSearch: SearchProps['onSearch'] = async (value) => {
    await router.push(`/tim-kiem?searchKey=${value}`);
    // dispatch(getAllProductAction({ searchKey: value.trim() }));
  };

  const onLogoutClicked = () => {
    setShowConfirmLogoutVisible(true);
  };

  return (
    <header className="wrapper-header-client">
      {/* header mid mobile */}
      <div className="container wrapper-header-client-nav-bar-mobile">
        <Flex align="center">
          <Button
            type="link"
            icon={<MenuOutlined style={{ fontSize: '20px', color: '#ffffff' }} />}
            onClick={() => setOpenDrawCatalog(true)}
          />
          <div className="wrapper-header-client-nav-bar-mobile-content-logo">
            <Image fill src="/images/icon-auth.png" alt="digital-fortress" sizes="100%" />
          </div>
        </Flex>
        <Flex align="center" className="wrapper-text-hotline">
          <p className="text-hotline">
            <span>Hotline:</span> 0329253123
          </p>
        </Flex>
      </div>
      {/* header mid */}
      <div className="wrapper-header-client-nav-bar">
        <div className="container">
          <div className="wrapper-header-client-nav-bar-content">
            <Link href="/">
              <div className="wrapper-header-client-nav-bar-content-logo">
                <Image fill src="/images/icon-auth.png" alt="digital-fortress" sizes="100%" />
              </div>
            </Link>
            {/* header search */}
            <div className="wrapper-header-client-nav-bar-content-search">
              <div className="wrapper-search-input">
                <Input.Search
                  loading={false}
                  enterButton
                  placeholder="Search ..."
                  size="large"
                  onSearch={onSearch}
                  allowClear
                />
              </div>
            </div>
            {/* header nav */}
            <div className="wrapper-header-client-nav-bar-content-menu">
              <Space>
                <Link href="/profile?page=my-order">
                  <Space className="hidden">
                    <SnippetsOutlined className="wrapper-header-client-nav-bar-content-menu-icon" />
                    <p className="wrapper-header-client-nav-bar-content-menu-title">
                      Order history
                    </p>
                  </Space>
                </Link>
                <div>
                  {info.accessToken ? (
                    <Popover
                      content={
                        <Space direction="vertical">
                          <Button
                            href="/profile?page=my-details"
                            type="link"
                            style={{ width: '180px', color: '#066156' }}
                          >
                            Thông tin cá nhân
                          </Button>

                          <Button
                            onClick={() => onLogoutClicked()}
                            type="primary"
                            style={{ width: '180px' }}
                          >
                            Đăng xuất
                          </Button>
                        </Space>
                      }
                    >
                      <Space className="wrapper-auth-btn wrapper-auth-info">
                        <div className="wrapper-auth-info-logo">
                          <Image
                            src={user?.avatar ? user.avatar : '/images/icon-auth.png'}
                            alt="digital-fortress"
                            fill
                            placeholder="blur"
                            blurDataURL={createRGBDataURL(199, 199, 199)}
                            sizes="100%"
                          />
                        </div>
                        <p className="wrapper-header-client-nav-bar-content-menu-title">
                          {info?.lastName || 'khách hàng'}
                        </p>
                      </Space>
                    </Popover>
                  ) : (
                    <Button onClick={() => router.push('/login')} className="wrapper-auth-btn">
                      <LoginOutlined /> Sign in
                    </Button>
                  )}
                </div>
              </Space>
            </div>
          </div>
        </div>
        <AppConfirmModal
          isVisible={confirmLogoutVisible}
          type={AppConfirmModalEnum.warning}
          title="Đăng Xuất"
          okTextButton="Đăng Xuất"
          onCancel={() => {
            setShowConfirmLogoutVisible(false);
          }}
          onOk={async () => {
            if (typeLogin === 'google') {
              signOut({ redirect: false }).then(async () => {
                const dispatchPromises = [
                  (window.location.href = '/'),
                  dispatch(
                    setTokenAuth({
                      expiresIn: 0,
                      accessToken: '',
                      refreshToken: '',
                    })
                  ),
                  dispatch(
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
                  ),
                ];

                await Promise.all([...dispatchPromises]);
              });
            } else {
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
                  // permission: {
                  //   id: '',
                  //   createdAt: '',
                  //   updatedAt: '',
                  //   deletedAt: '',
                  //   groupName: '',
                  //   permission: [],
                  //   users: [],
                  // },
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
              setShowConfirmLogoutVisible(false);
              router.push('/', { scroll: false });
            }
          }}
        />
      </div>
      <Drawer
        className="wrapper-draw-header"
        title="Danh sách loại sản phẩm"
        placement="left"
        width="100vw"
        onClick={() => {
          setOpenDrawCatalog(false);
        }}
        open={openDrawCatalog}
        extra={
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setOpenDrawCatalog(false);
                router.push(`/`);
              }}
            >
              Trang chủ
            </Button>
          </Space>
        }
      />
    </header>
  );
}
