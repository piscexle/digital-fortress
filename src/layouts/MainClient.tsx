// 'use client';

import React, { type ReactNode, useEffect } from 'react';
import FooterClient from '@/components/Footer/Footer';
import HeaderClient from '@/components/HeaderClient/HeaderClient';
import { ConfigProvider, FloatButton, ThemeConfig } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
// import ModalAuth from '@/components/ModalAuth/ModalAuth';
// import { useAppDispatch, useAppSelector } from '@/store';
// import { setIsModalAuthVisible } from '@/store/auth/auth.reducer';
import './layout.scss';
import { font } from '@/config/font';
// import BoxMessenger from '@/components/BoxMesseger/BoxMessenger';
import BubbleIcon from '@/components/BubbleIcon/BubbleIcon';

type IMainProps = {
  children: ReactNode;
};

const theme: ThemeConfig = {
  token: {
    // colorPrimary: '#FF9AA2',
    fontFamily: font.style.fontFamily,
  },
  components: {
    Button: {
      colorPrimary: '#ff1e56',
      // primaryColor: '#3C3F4B',
      colorPrimaryHover: '#ffffff',
      colorPrimaryActive: '#ffffff',
      colorLinkHover: '#ff1e56',
      colorLinkActive: '#ff1e56',
      colorInfoTextActive: '#ff1e56',
    },
    FloatButton: {
      colorPrimary: '#ff1e56',
      colorPrimaryHover: '#ff1e56',
    },
    Spin: {
      colorPrimary: '#ff1e56',
    },
  },

  hashed: false,
};

function MainClient({ children }: IMainProps) {
  const pathname = usePathname();
  // const dispatch = useAppDispatch();
  // const { isModalAuthVisible } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ConfigProvider theme={theme}>
      <HeaderClient />
      <main>{children}</main>
      <FooterClient />
      <FloatButton.BackTop type="primary" icon={<ArrowUpOutlined />} />
      {/* <ModalAuth
        visible={isModalAuthVisible}
        onClose={() => dispatch(setIsModalAuthVisible(false))}
      /> */}
      {/* <BoxMessenger /> */}
      <BubbleIcon />
    </ConfigProvider>
  );
}

export { MainClient };
