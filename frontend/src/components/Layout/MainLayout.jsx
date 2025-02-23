// components/Layout/MainLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};

export default MainLayout;

