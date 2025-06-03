import React from 'react';
import styles from "./styles.module.css";
import Sidebar from '@/components/Sidebar';

const AdminLayout = ({children}) => {
  return (
    <div className={styles.dashboard_admin}>
        <Sidebar/>
        <div className={styles.content}>
            {children}
        </div>
    </div>
  )
}

export default AdminLayout; 