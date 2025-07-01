import { useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { useTheme } from '../../hooks/useTheme.ts';
import './Sidebar.css';
import { getMenuItems } from './utils/getMenuItems.tsx';

const Sidebar = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const menuItems = getMenuItems();

  return (
    <div className="sidebar">
      <div className="top">
        <div className="branding">
          <BulbOutlined className="icon" />
          <span className="branding-title">Tentry</span>
        </div>
      </div>

      <Menu mode="inline" selectedKeys={[location.pathname]} items={menuItems} className="menu" />

      <div
        className="theme-toggle-switch"
        onClick={toggleTheme}
        role="button"
        aria-label="Переключить тему"
      >
        <div className={`switch ${isDark ? 'dark' : 'light'}`}>
          <div className="slider">{isDark ? '🌙' : '☀️'}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
