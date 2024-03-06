import { SettingOutlined } from '@ant-design/icons';
import { useWindowWidth } from '@hooks/useWindowWidth';
import { Layout } from 'antd';

import { LinkFC } from '../LInk/LinkFC';

import styles from './Header.module.scss';

const { Header } = Layout;

export const HeaderFC = () => {
    const windowWidth = useWindowWidth();

    return (
        <div className={styles.head}>
            <Header title={'hbjhvhv'} className={styles.header}  >
                <LinkFC href='#'>Главная</LinkFC>
                <div className={styles.someContent}>
                    <h1 className={styles.title}>Приветствуем тебя в CleverFit &mdash; приложении, которое поможет тебе добиться своей мечты!</h1>
                    <section className={styles.config}>
                        <SettingOutlined />
                        <LinkFC href='#'>{windowWidth > 480 && <>Настройки</>}</LinkFC>
                    </section>
                </div>
            </Header>
        </div>
    )
}

