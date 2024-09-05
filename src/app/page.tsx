'use client';

import { Layout, Menu, Table, Tag, Avatar, Tooltip, Button } from 'antd';
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

const { Header, Sider, Content } = Layout;

interface DataType {
  key: string;
  project: string;
  date: string;
  status: string[];
}

const data: DataType[] = [
  {
    key: '1',
    project: 'Sisyphus',
    date: '22 Jan 2022',
    status: ['Active', 'Customer data', 'Admin'],
  },
  {
    key: '2',
    project: 'Sisyphus',
    date: '22 Jan 2022',
    status: ['Active', 'Customer data', 'Admin'],
  },
  {
    key: '3',
    project: 'Sisyphus',
    date: '22 Jan 2022',
    status: ['Active', 'Customer data', 'Admin'],
  },
  // Add other data entries similarly...
];

const columns: ColumnsType<DataType> = [
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => (
      <>
        {status.map((tag) => {
          // eslint-disable-next-line no-nested-ternary
          const color = tag === 'Active' ? 'green' : tag === 'Admin' ? 'volcano' : 'geekblue';
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Actions',
    key: 'action',
    render: () => (
      <span>
        <Button icon={<EditOutlined />} style={{ marginRight: 8 }} />
        <Button icon={<DeleteOutlined />} />
      </span>
    ),
  },
];

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
        <div className="logo" style={{ color: 'white', padding: 16 }}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} Digital Fortress
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2">Task</Menu.Item>
          <Menu.Item key="3">Projects</Menu.Item>
          <Menu.Item key="4">Schedule</Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <div style={{ padding: '0 16px' }}>
            <Tooltip title="Lê Dương Kiều Trâm">
              <Avatar icon={<UserOutlined />} />
            </Tooltip>
          </div>
        </Header>
        <Content style={{ margin: '16px' }}>
          <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
