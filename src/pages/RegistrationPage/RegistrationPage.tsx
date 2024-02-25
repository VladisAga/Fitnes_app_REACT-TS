import EnterFC from '@components/Registration/EnterFC';
import RegistrationFC from '@components/Registration/RegistrationFC';
import { Tabs } from 'antd';
import styles from './RegistrationPage.module.scss';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';

interface IRegistrationPage {
    keyValue?: string;
}

const RegistrationPage: React.FC<IRegistrationPage> = ({ keyValue }) => {
    const [key, setKey] = useState('1');

    useEffect(() => {
        if (keyValue) {
            setKey(keyValue); 
        }
    }, [keyValue]); 

    const onChange = (key: string) => {
        setKey(key); 
    };

    return (
        <div className={cn(styles['regBox'], {
            [styles['regBoxVariation']]: key === '2'
        })}>
            <section className={styles.registrationArea}>
                <div className={styles.logoBox}>
                    <img src="/logo.svg" alt="" />
                </div>
                <Tabs
                    defaultActiveKey={keyValue ? keyValue : '1'}
                    onChange={onChange}
                    items={[
                        {
                            label: `Вход`,
                            key: '1',
                            children: <EnterFC />,
                        },
                        {
                            label: `Регистрация`,
                            key: '2',
                            children: <RegistrationFC />
                        }
                    ]}
                />
                <div className={cn(styles['whiteArea'], {
                    [styles['whiteAreaVariation']]: key === '2'
                })}></div>
            </section>

        </div>
    )
}

export default RegistrationPage;