import { SettingOutlined } from '@ant-design/icons';
import { useWindowWidth } from '@hooks/useWindowWidth';
import { LinkFC } from '../LInk/LinkFC';
import styles from './Settings.module.scss';
import cn from 'classnames';

type TSettings = {
    className?: string;
}

const Settings: React.FC<TSettings> = ({ className }) => {
    const windowWidth = useWindowWidth();
    return (
        <>
            <section className={cn(styles.config, className)}>
                <SettingOutlined />
                <LinkFC href='#'>{windowWidth > 480 && <>Настройки</>}</LinkFC>
            </section>
        </>
    )
}

export default Settings;