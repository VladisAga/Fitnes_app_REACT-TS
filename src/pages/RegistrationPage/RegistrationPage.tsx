import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnterFC from '@components/Registration/EnterFC';
import RegistrationFC from '@components/Registration/RegistrationFC';
import { Tabs } from 'antd';
import cn from 'classnames';

import styles from './RegistrationPage.module.scss';

type IRegistrationPage = {
    keyValue?: string;
}

const RegistrationPage: React.FC<IRegistrationPage> = ({ keyValue }) => {
    const [key, setKey] = useState('1');
    const navigate = useNavigate();

    useEffect(() => {
        if (keyValue) {
            setKey(keyValue);
        }
    }, [keyValue]);

    useEffect(() => {
        if (key === '2') {
            navigate('/auth/registration', { replace: true })
        }
    }, [key, navigate])

    const onChange = (key: string) => {
        setKey(key);
    };

    return (
        <div className={cn(styles.regBox, {
            [styles.regBoxVariation]: key === '2'
        })}>
            <section className={styles.registrationArea}>
                <div className={styles.logoBox}>
                    <img src='/logo.svg' alt="logo" />
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
                <div className={cn(styles.whiteArea, {
                    [styles.whiteAreaVariation]: key === '2'
                })}></div>
            </section>
        </div>
    )
}

export default RegistrationPage;