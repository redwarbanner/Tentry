import { NavLink } from 'react-router-dom';
import {
  DashboardOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  GlobalOutlined,
  EditOutlined,
} from '@ant-design/icons';

export const getMenuItems = () => [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: <NavLink to="/dashboard">Dashboard</NavLink>,
  },
  {
    key: '/analyzer',
    icon: <FileTextOutlined />,
    label: <NavLink to="/analyzer">Анализ текста</NavLink>,
  },
  {
    key: '/uniqueness',
    icon: <CheckCircleOutlined />,
    label: <NavLink to="/uniqueness">Уникальность</NavLink>,
  },
  {
    key: '/page-analyzer',
    icon: <GlobalOutlined />,
    label: <NavLink to="/page-analyzer">Анализ страницы</NavLink>,
  },
  {
    key: '/editor',
    icon: <EditOutlined />,
    label: <NavLink to="/editor">Редактор</NavLink>,
  },
];
