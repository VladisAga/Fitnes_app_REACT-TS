import styles from './EnterFC.module.scss';

import { GooglePlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { usePostNewUserMutation } from '@redux/usersApi';
import { useState, useEffect } from 'react';
import { resultValues } from '@pages/RusultPage/resultValues';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';
import { setPreviousValue } from '@redux/checkLocationSlice';
import { IPreviousValueRedReg } from '../../types/commonTypes';
import { setStateOfLoadTrue, setStateOfLoadFalse } from '@redux/isLoadingSlice';

const RegistrationFC = () => {
    const previousValueRed = useSelector((state: RootState) => state.checkLocation.previousValueRed) as IPreviousValueRedReg | null;
    const previousLocation = useSelector((state: RootState) => state.router.previousLocations);
    const [addUser, { isLoading }] = usePostNewUserMutation();
    const [btnState, setBtnState] = useState(false);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (previousLocation && previousLocation[1] && previousLocation[1].location?.pathname === '/result/error') {
            previousValueRed && addUser({ ...previousValueRed.user, password: previousValueRed.password }).unwrap()
                .then(() => {
                    navigate(`/result/${resultValues['success'].trigger}`, { replace: true });
                })
                .catch((error: any) => {
                    dispatch(setPreviousValue(previousValueRed));
                    switch (error.status) {
                        case (409):
                            navigate(`/result/${resultValues['error-user-exist'].trigger}`, { replace: true });
                            break;
                        default:
                            navigate(`/result/${resultValues['error'].trigger}`, { replace: true });
                            break;
                    }
                })
        }
    }, [previousValueRed]);

    const click = () => {
        setBtnState(true);
    }

    const handleAddUser = (values: any) => {
        setUserData(values);

        if (userData) {
            addUser({ ...values.user, password: values.password }).unwrap()
                .then(() => {
                    navigate(`/result/${resultValues['success'].trigger}`, { replace: true });
                })
                .catch((error) => {
                    dispatch(setPreviousValue(userData));
                    switch (error.status) {
                        case (409):
                            navigate(`/result/${resultValues['error-user-exist'].trigger}`, { replace: true });
                            break;
                        default:
                            navigate(`/result/${resultValues['error'].trigger}`, { replace: true });
                            break;
                    }
                })
        }
    };

    useEffect(() => {
        if (isLoading) {
            dispatch(setStateOfLoadTrue());
        }
        return () => { dispatch(setStateOfLoadFalse()); }
    }, [isLoading]);

    return (
        <section className={styles.enterForm}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={handleAddUser}
            >
                <Form.Item name={['user', 'email']} rules={[{ type: 'email', required: true, message: '' }]} style={{ paddingTop: '7px' }}>
                    <Input data-test-id='registration-email' addonBefore='e-mail:' />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: '48px' }}
                    name="password"
                    help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    rules={[{ required: true, message: '' }, ({ getFieldValue }) => ({
                        validator() {
                            if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,}$/.test(getFieldValue('password'))) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Пароль не менее 8 символов, с заглавной буквой и цифрой'));
                        },
                    })]}
                >
                    <Input.Password data-test-id='registration-password' placeholder='Пароль' />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: '62px' }}
                    name="confirm"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: ''
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    value.length && setBtnState(false);
                                    return Promise.resolve();
                                }
                                if (getFieldValue('password') === value && value !== 0) setBtnState(btnState);
                                return Promise.reject(new Error('Пароли не совпадают'));
                            },
                        }),
                    ]}
                >
                    <Input.Password data-test-id='registration-confirm-password' placeholder='Повторите пароль' />
                </Form.Item>
                <Form.Item style={{ marginBottom: '16px' }}>
                    <Button data-test-id='registration-submit-button' type="primary" htmlType="submit" onClick={click} className={cn({ [styles['undefined']]: btnState })}>
                        Войти
                    </Button>
                </Form.Item>
                <Form.Item style={{ marginBottom: '0' }}>
                    <button className={styles.googleBtn}>
                        <GooglePlusOutlined />
                        <NavLink to={''}>Регистрация через Google</NavLink>
                    </button>
                </Form.Item>
            </Form>
        </section>
    );
}

export default RegistrationFC;
