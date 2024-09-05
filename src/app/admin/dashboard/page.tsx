'use client';

import React from 'react';
import MainAdmin from '@/layouts/MainAdmin';
import HeadAdmin from '@/components/HeadAdmin/HeadAdmin';
import { Space, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  CodeSandboxOutlined,
  SnippetsOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './style.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
const { Title: TitleAntd } = Typography;

const Dashboard = () => {
  const getDashboardAdmin = {
    data: {
      bestSeller: [
        { name: 'Product 1', totalquantity: 100 },
        { name: 'Product 2', totalquantity: 80 },
        { name: 'Product 3', totalquantity: 60 },
        { name: 'Product 4', totalquantity: 40 },
        { name: 'Product 5', totalquantity: 20 },
      ],
      totalRevenue: 10000000,
      totalOrders: 10000,
      totalVisitors: 10000,
      totalProducts: 10000,
      totalUsers: 10000,
    },
  };
  const labelsBar = getDashboardAdmin.data?.bestSeller?.map((item) => ({
    name: item.name,
    totalquantity: item.totalquantity,
  }));

  const optionsBar = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
        text: '',
      },
    },
  };

  const dataBar = {
    labels: labelsBar?.map((item) => item.name) || [],
    datasets: [
      {
        label: 'Số lượng đặt hàng (tháng)',
        data: labelsBar?.map((item) => item.totalquantity),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <MainAdmin>
      <HeadAdmin title="Thống kê" />
      <div className="wrapper-list-card-dashboard">
        <div className="card-dashboard">
          <div className="card-dashboard-left">
            <UserAddOutlined />
          </div>
          <Space direction="vertical">
            <p className="card-dashboard-title">Tổng số tài khoản</p>
            <p className="card-dashboard-detail">{getDashboardAdmin.data.totalUsers} Tài khoản</p>
          </Space>
        </div>
        <div className="card-dashboard">
          <div className="card-dashboard-left">
            <CodeSandboxOutlined />
          </div>
          <Space direction="vertical">
            <p className="card-dashboard-title">Tổng số sản phẩm</p>
            <p className="card-dashboard-detail">{getDashboardAdmin.data.totalProducts} Sản phẩm</p>
          </Space>
        </div>
        <div className="card-dashboard">
          <div className="card-dashboard-left">
            <SnippetsOutlined />
          </div>
          <Space direction="vertical">
            <p className="card-dashboard-title">Tổng số đơn hàng</p>
            <p className="card-dashboard-detail">{getDashboardAdmin.data.totalOrders} Đơn hàng</p>
          </Space>
        </div>
        <div className="card-dashboard">
          <div className="card-dashboard-left">
            <UserOutlined />
          </div>
          <Space direction="vertical">
            <p className="card-dashboard-title">Tổng số khách ghé thăm</p>
            <p className="card-dashboard-detail">
              {getDashboardAdmin.data.totalVisitors} lượt truy cập
            </p>
          </Space>
        </div>
      </div>
      <div className="wrapper-list-card-dashboard">
        <div className="card-chart-dashboard">
          <TitleAntd level={5}>Sản phẩm bán chạy nhất</TitleAntd>
          <div className="card-chart-dashboard-info">
            <Bar options={optionsBar} data={dataBar} />
          </div>
        </div>
      </div>
    </MainAdmin>
  );
};

export default Dashboard;
