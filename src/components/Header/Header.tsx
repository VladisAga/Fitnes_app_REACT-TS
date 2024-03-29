import { Layout } from 'antd';

import { LinkFC } from '../LInk/LinkFC';

import styles from './Header.module.scss';
import Settings from '@components/SettingsFC/Settings';

const { Header } = Layout;

export const HeaderFC = () => (
    <div className={styles.head}>
        <Header title={'hbjhvhv'} className={styles.header}  >
            <LinkFC href='/main'>Главная</LinkFC>
            <div className={styles.someContent}>
                <h1 className={styles.title}>Приветствуем тебя в CleverFit &mdash; приложении, которое поможет тебе добиться своей мечты!</h1>
                <Settings />
            </div>
        </Header>
    </div>
);


