'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import HeaderAdmin from '@/components/HeaderAdmin/HeaderAdmin';
import { ArrowUpOutlined } from '@ant-design/icons';
import { ConfigProvider, FloatButton, Layout, Menu, MenuProps, Space, ThemeConfig } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store';
import SimpleBar from 'simplebar-react';
import { ADMIN_PATH } from '@/config/constant';
import { setIsCollapsedSidebarAdmin } from '@/store/setting-app/setting-app.reducer';
import { adminFont } from '@/config/font';
// import { encryptSocketToken } from '@/utils/encryptSocketToken';
// import io from 'socket.io-client';
import routes from './routes';
import './layout.scss';

const { Sider, Content } = Layout;

type IMainProps = {
  children: ReactNode;
};

interface InfoUser {
  user: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    role: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    avatar: string;
  };
  token: {
    expiresIn: number;
    accessToken: string;
    refreshToken: string;
  };
}

const theme: ThemeConfig = {
  token: {
    // colorPrimary: '#FF1493',
    fontFamily: adminFont.style.fontFamily,
  },
  components: {
    Button: {
      colorPrimary: '#C71D1D',
      colorPrimaryHover: '#C71D1D',
      colorPrimaryActive: '#3C3F4B',
      colorLinkHover: '#FF96E2',
    },
  },
  hashed: false,
};

function MainAdmin({ children }: IMainProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const authSlice = useAppSelector((state) => state.authSlice);
  const { isCollapsedSidebarAdmin } = useAppSelector((state) => state.settingAppSlice);
  const [collapsed, setCollapsed] = useState(isCollapsedSidebarAdmin);
  const [urlSelectedSub, setUrlSelectedSub] = useState<string>('');
  const [openKeysMainMenu, setOpenKeysMainMenu] = useState<string[]>([]);
  const [info, setInfo] = useState<InfoUser>({
    token: {
      expiresIn: 0,
      accessToken: '',
      refreshToken: '',
    },
    user: {
      id: '',
      createdAt: '',
      updatedAt: '',
      deletedAt: null,
      role: '',
      email: '',
      firstName: null,
      lastName: null,
      avatar: '',
    },
  });

  // useEffect(() => {
  //   // Create a socket connection
  //   const socket = io(
  //     `${process.env.NEXT_PUBLIC_SOCKET_API_URL}?token=${encryptSocketToken(
  //       authSlice.user.id
  //     )}&userId=${authSlice.user.id}`
  //   );
  //   // Listen for incoming messages
  //   socket.on('SYSTEM_EVENT', (message: any) => {
  //     if (message.type === 'ACTIVITY_LOGS') {
  //       dispatch(addHistoryActivity(message.metaData));
  //     }
  //   });
  //   socket.on('ORDER_EVENT', (message: any) => {
  //     console.log('message ORDER_EVENT:  ', message);
  //   });

  //   // Clean up the socket connection on unmount
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [authSlice.user.id, dispatch]);

  useEffect(() => {
    setInfo(authSlice);
  }, [authSlice]);

  useEffect(() => {
    const handleRedirect = () => {
      if (
        !Object.values(authSlice.token).every((value) => value !== '' && value !== 0) ||
        authSlice.user.role === 'USER'
      ) {
        router.push(ADMIN_PATH.auth.login);
      }
    };

    handleRedirect(); // Call the function immediately
  }, [authSlice, router]);

  // useEffect(() => {
  //   const findRoute = routes.find((item) => pathname.includes(item.key));
  //   const pathnameLast = pathname.split('/')[2];
  //   if (pathnameLast === 'admin') {
  //     setUrlSelectedSub(ADMIN_PATH.dashboard.root);
  //   }
  //   if (findRoute?.key) {
  //     const latestOpenKey = routes
  //       .filter((item) => item.key === findRoute?.key)
  //       .map((item) => item.key);
  //     if (!collapsed) {
  //       setOpenKeysMainMenu(latestOpenKey);
  //     }
  //     setUrlSelectedSub(findRoute.key);
  //   }
  // }, [pathname, collapsed]);

  useEffect(() => {
    setCollapsed(isCollapsedSidebarAdmin);
  }, [isCollapsedSidebarAdmin]);

  const onOpenChangeMainMenu: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeysMainMenu.indexOf(key) === -1);
    if (latestOpenKey) {
      setOpenKeysMainMenu(keys);
    } else {
      setOpenKeysMainMenu(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleCollapseHeader = () => {
    dispatch(setIsCollapsedSidebarAdmin(!collapsed));
    setCollapsed(!collapsed);
  };

  const renderMenuItem = routes.map((route) => {
    if (route?.children) {
      return {
        key: route.key,
        icon: <span>{route.icon}</span>,
        label: <span className="ant-menu-title-content">{route.label}</span>,
        children: route?.children.map((routeSub) => ({
          key: `${route.key}/${routeSub.key}`,
          label: (
            <Link href={`${route.key}/${routeSub.key}`} scroll={false}>
              {routeSub.label}
            </Link>
          ),
        })),
      };
    }
    return {
      key: route.key,
      icon: <Link href={route.key}>{route.icon}</Link>,
      label: (
        <Link href={route.key} scroll={false}>
          {route.label}
        </Link>
      ),
    };
  });

  return (
    <ConfigProvider theme={theme}>
      {!Object.values(info.token).every((value) => value !== '' && value !== 0) &&
        (info.user.role === 'USER' || info.user.role === '') && <div />}
      {Object.values(info.token).every((value) => value !== '' && value !== 0) &&
        (info.user.role === 'ADMIN' || info.user.role === 'SALE') && (
          <Layout hasSider>
            <HeaderAdmin collapsed={collapsed} onChangeCollapseHeader={handleCollapseHeader} />
            <Sider
              className="customize-sidebar"
              width={250}
              trigger={null}
              collapsible
              collapsed={collapsed}
            >
              <div className="header-sidebar">
                <Link href="/">
                  <Space>
                    {collapsed && <h3>Admin</h3>}
                    {!collapsed && <span>digital-fortress Admin</span>}
                  </Space>
                </Link>
              </div>
              <SimpleBar className="customize-menu-scroll" style={{ height: 'calc(100vh - 60px)' }}>
                <Menu
                  mode="inline"
                  selectedKeys={[urlSelectedSub]}
                  // defaultOpenKeys={[urlSelectedMain]}
                  openKeys={openKeysMainMenu}
                  onOpenChange={onOpenChangeMainMenu}
                  items={renderMenuItem}
                />
              </SimpleBar>
            </Sider>

            <Layout
              className={`${'customize-layout'} ${collapsed ? 'collapsed-customize-layout' : ''}`}
            >
              <div className="customize-content-scroll">
                <Content
                  className={
                    pathname.includes(ADMIN_PATH.dashboard.root) ||
                    pathname === '/' ||
                    pathname.includes('products/new') ||
                    pathname.includes('products/')
                      ? 'customize-content-no-overview'
                      : 'customize-content'
                  }
                >
                  {children}
                </Content>
              </div>
            </Layout>
          </Layout>
        )}
      <FloatButton.BackTop type="primary" icon={<ArrowUpOutlined />} />
    </ConfigProvider>
  );
}

export default MainAdmin;
