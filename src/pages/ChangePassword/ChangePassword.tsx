import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resultValues } from '@pages/RusultPage/resultValues';
import { setPreviousValue } from '@redux/checkLocationSlice';
import { setStateOfLoadFalse, setStateOfLoadTrue } from '@redux/isLoadingSlice';
import { usePostChangePasswordMutation } from '@redux/usersApi';
import { Button, Form, Input } from 'antd';

import { usePreviousLocation, usePreviousValueRed } from '../../selectors/selectors';
import { IPreviousValueRed, TValuesPassword } from '../../types/commonTypes';

import styles from './ChangePassword.module.scss';

const ChangePassword = () => {
    const [changePassword, { isLoading }] = usePostChangePasswordMutation();
    const previousValueRed = usePreviousValueRed() as IPreviousValueRed | null;
    const previousLocation = usePreviousLocation();
    const [password, setPassword] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (previousLocation && previousLocation[1] && previousLocation[1].location?.pathname === '/result/error-change-password') {
            previousValueRed && changePassword({ password: previousValueRed.password, confirmPassword: previousValueRed.confirm }).unwrap()
                .then(() => {
                    navigate(`/result/${resultValues['success-change-password'].trigger}`, { replace: true })
                })
                .catch(() => {
                    dispatch(setPreviousValue(previousValueRed));
                    navigate(`/result/${resultValues['error-change-password'].trigger}`, { replace: true })
                })
        }
    }, [previousValueRed, changePassword, dispatch, navigate, previousLocation]);

    const changePas = (value: TValuesPassword) => {
        setPassword(value);
        if (password) {
            changePassword({ password: value.password, confirmPassword: value.confirm }).unwrap()
                .then(() => {
                    navigate(`/result/${resultValues['success-change-password'].trigger}`, { replace: true })
                })
                .catch(() => {
                    dispatch(setPreviousValue(password));
                    navigate(`/result/${resultValues['error-change-password'].trigger}`, { replace: true })
                })
        }
    };

    useEffect(() => {
        if (isLoading) {
            dispatch(setStateOfLoadTrue());
        }
        return () => { dispatch(setStateOfLoadFalse()); }
    }, [isLoading, dispatch]);

    return (
        <div className={styles.changePasBox}>
            <section className={styles.changePasForm}>
                <h2>Восстановление аккаунта</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={changePas}
                >
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
                        <Input.Password data-test-id='change-password' placeholder='Новый пароль' />
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
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password data-test-id='change-confirm-password' placeholder='Повторите пароль' />
                    </Form.Item>
                    <Form.Item >
                        <Button data-test-id='change-submit-button' type="primary" htmlType="submit" >
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
    )
}

export default ChangePassword;