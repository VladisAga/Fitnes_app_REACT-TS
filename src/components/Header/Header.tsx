import { Layout } from 'antd';
//import cn from 'classnames';
import styles from './Header.module.scss';
import { Link } from '../LInk/Link';
// import { PageHeader } from '@ant-design/pro-layout';
import { SettingOutlined } from '@ant-design/icons';
import { useWindowWidth } from '@pages/main-page/WindowWidth';

const { Header } = Layout;

export const HeaderFC = () => {
    const windowWidth = useWindowWidth();


    return (
        <div className={styles.head}>
            <Header title={'hbjhvhv'} className={styles.header}  >
                <Link href='#'>Главная</Link>
                <div className={styles.someContent}>
                    <h1 className={styles.title}>Приветствуем тебя в CleverFit &mdash; приложении, которое поможет тебе добиться своей мечты!</h1>
                    <section className={styles.config}>
                        <SettingOutlined />
                        <Link href='#'>{windowWidth > 480 && <>Настройки</>}</Link>
                    </section>
                </div>
            </Header>
        </div>
    )
}

