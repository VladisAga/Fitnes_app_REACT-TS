import styles from './ChangePassword.module.scss';
import { Button, Form, Input } from 'antd';
import { usePostChangePasswordMutation } from '@redux/usersApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resultValues } from '@pages/RusultPage/resultValues';
import { setPreviousValue } from '@redux/checkLocationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';
import { IPreviousValueRed } from '../../types/commonTypes';
import { setStateOfLoadTrue, setStateOfLoadFalse } from '@redux/isLoadingSlice';

const ChangePassword = () => {
    const [changePassword, { isLoading }] = usePostChangePasswordMutation();
    const previousValueRed = useSelector((state: RootState) => state.checkLocation.previousValueRed) as IPreviousValueRed | null;
    const previousLocation = useSelector((state: RootState) => state.router.previousLocations);
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
    }, [previousValueRed]);

    const changePas = (value: any) => {
        setPassword(value);
        if (password) {
            changePassword({ password: value.password, confirmPassword: value.confirm }).unwrap() //!!!!!!!
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
    }, [isLoading]);

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