import styles from './MainLayout.module.scss';
import Sidebar from "@components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Layout } from 'antd';


const MainLayout: React.FC = () => {
  return (
    <>
      <Layout >
        <Sidebar />
        <section className={styles.backImg}>
          <Outlet />
        </section>
      </Layout>
    </>
  );
};

export default MainLayout;
