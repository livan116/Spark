// components/Layout/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Link as LinkIcon, BarChart2, Settings, Palette } from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: <LinkIcon size={20} />, label: 'Links', path: '/links' },
    { icon: <BarChart2 size={20} />, label: 'Analytics', path: '/analytics' },
    { icon: <Palette size={20} />, label: 'Appearance', path: '/appearance' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.sparkLogo}>🟢 Spark</span>
      </div>
      
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.navItem} ${
              location.pathname === item.path ? styles.active : ''
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;