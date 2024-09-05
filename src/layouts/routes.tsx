import React from 'react';
import {
  AreaChartOutlined,
  UsergroupAddOutlined,
  ShareAltOutlined,
  LikeOutlined,
} from '@ant-design/icons';
import { ADMIN_PATH } from '@/config/constant';

type MenuItem = {
  key: string;
  icon?: React.ReactNode | React.JSX.Element | string;
  label: React.ReactNode | React.JSX.Element | string;
  children?: MenuItem[];
  type?: 'group';
};

const routes: MenuItem[] = [
  {
    label: <span>Thống kê</span>,
    key: ADMIN_PATH.dashboard.root,
    icon: <AreaChartOutlined />,
  },
  {
    label: <span>Quản lý tài khoản</span>,
    key: '/admin/quan-ly-tai-khoan',
    icon: <UsergroupAddOutlined />,
  },
  {
    label: <span>Quản lý video & tin tức</span>,
    key: '/admin/quan-ly-goc-chia-se',
    icon: <ShareAltOutlined />,
    children: [
      {
        key: 'tin-tuc',
        label: 'Quản lý tin tức',
      },
      {
        key: 'video',
        label: 'Quản lý video',
      },
    ].map((item) => ({
      key: item.key,
      label: item.label,
    })),
  },
  {
    label: <span>Quản lý đánh giá</span>,
    key: '/admin/quan-ly-danh-gia',
    icon: <LikeOutlined />,
  },
];

export default routes;
