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
import { setPreviousValue, setPreviousPath } from '@redux/checkLocationSlice';
import { IPreviousValueRedReg } from '../../types/commonTypes';
import { setStateOfLoadTrue, setStateOfLoadFalse } from '@redux/isLoadingSlice';

const RegistrationFC = () => {
    const previousValueRed = useSelector((state: RootState) => state.checkLocation.previousValueRed) as IPreviousValueRedReg | null;
    const previousPath = useSelector((state: RootState) => state.checkLocation.previousPath);
    const [addUser, { isLoading, data }] = usePostNewUserMutation();
    const [btnState, setBtnState] = useState(false);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (previousPath === '/registrationPage/result/error') {
            dispatch(setPreviousPath('/registrationPage/registration'));
            previousValueRed && addUser({ ...previousValueRed.user, password: previousValueRed.password }).unwrap()
                .then(() => {
                    navigate(`/registrationPage/result/${resultValues['success'].trigger}`, { replace: true });
                })
                .catch((error: any) => {
                    dispatch(setPreviousValue(previousValueRed));
                    switch (error.status) {
                        case (409):
                            navigate(`/registrationPage/result/${resultValues['error-user-exist'].trigger}`, { replace: true });
                            break;
                        default:
                            navigate(`/registrationPage/result/${resultValues['error'].trigger}`, { replace: true });
                            break;
                    }
                    console.log(error);
                })
        }
        dispatch(setPreviousPath('/registrationPage/registration'));
    }, [previousValueRed]);

    const click = () => {
        setBtnState(true);
    }

    const handleAddUser = (values: any) => {
        console.log('Received values of form: ', values);
        setUserData(values);

        if (userData) {
            addUser({ ...values.user, password: values.password }).unwrap()
                .then(() => {
                    navigate(`/registrationPage/result/${resultValues['success'].trigger}`, { replace: true });
                })
                .catch((error) => {
                    dispatch(setPreviousValue(userData));
                    switch (error.status) {
                        case (409):
                            navigate(`/registrationPage/result/${resultValues['error-user-exist'].trigger}`, { replace: true });
                            break;
                        default:
                            navigate(`/registrationPage/result/${resultValues['error'].trigger}`, { replace: true });
                            break;
                    }
                    console.log(error);
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
                    <Input addonBefore='e-mail:' />
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
                    <Input.Password placeholder='Пароль' />
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
                    <Input.Password placeholder='Повторите пароль' />
                </Form.Item>
                <Form.Item style={{ marginBottom: '16px' }}>
                    <Button type="primary" htmlType="submit" onClick={click} className={cn({ [styles['undefined']]: btnState })}>
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
