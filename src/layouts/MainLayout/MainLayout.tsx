import { Outlet } from "react-router-dom";
import Sidebar from "@components/Sidebar/Sidebar";
import { Layout } from 'antd';

import styles from './MainLayout.module.scss';


const MainLayout: React.FC = () => (
  <>
    <Layout >
      <Sidebar />
      <section className={styles.backImg}>
        <Outlet />
      </section>
    </Layout>
  </>
);


export default MainLayout;
