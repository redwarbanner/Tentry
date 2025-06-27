import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, Switch } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  GlobalOutlined,
  EditOutlined,
  BulbOutlined
} from '@ant-design/icons';
import { useTheme } from '../hooks/useTheme';

const Sidebar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <NavLink to="/dashboard">Dashboard</NavLink>
    },
    {
      key: '/analyzer',
      icon: <FileTextOutlined />,
      label: <NavLink to="/analyzer">Анализ текста</NavLink>
    },
    {
      key: '/uniqueness',
      icon: <CheckCircleOutlined />,
      label: <NavLink to="/uniqueness">Уникальность</NavLink>
    },
    {
      key: '/page-analyzer',
      icon: <GlobalOutlined />,
      label: <NavLink to="/page-analyzer">Анализ страницы</NavLink>
    },
    {
      key: '/editor',
      icon: <EditOutlined />,
      label: <NavLink to="/editor">Редактор</NavLink>
    }
  ];

  return (
    <div className="sidebar">
      <div style={{ padding: '0 24px', marginBottom: '24px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          marginBottom: '24px'
        }}>
          <BulbOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          <h1 style={{ 
            margin: 0, 
            fontSize: '20px', 
            fontWeight: 600,
            color: 'var(--text-color)'
          }}>
            Tentry
          </h1>
        </div>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'var(--card-background)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px'
        }}>
          <span style={{ fontSize: '14px' }}>Тёмная тема</span>
          <Switch 
            checked={isDark} 
            onChange={toggleTheme}
            size="small"
          />
        </div>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{
          background: 'transparent',
          border: 'none'
        }}
      />
    </div>
  );
};

export default Sidebar;
