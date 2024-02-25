import styles from './ChangePassword.module.scss';
import { Button, Form, Input } from 'antd';
import { usePostChangePasswordMutation } from '@redux/usersApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resultValues } from '@pages/RusultPage/resultValues';
import { setPreviousValue, setPreviousPath } from '@redux/checkLocationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';
import { IPreviousValueRed } from '../../types/commonTypes';
import { setStateOfLoadTrue, setStateOfLoadFalse } from '@redux/isLoadingSlice';

const ChangePassword = () => {
    const [changePassword, { isLoading }] = usePostChangePasswordMutation();
    const previousValueRed = useSelector((state: RootState) => state.checkLocation.previousValueRed) as IPreviousValueRed | null;
    const previousPath = useSelector((state: RootState) => state.checkLocation.previousPath);
    const [password, setPassword] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (previousPath === '/registrationPage/result/error-change-password') {
            dispatch(setPreviousPath('/change-password'));
            previousValueRed && changePassword({ password: previousValueRed.password, confirmPassword: previousValueRed.confirm }).unwrap()
                .then(() => {
                    navigate(`/registrationPage/result/${resultValues['success-change-password'].trigger}`, { replace: true })
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(setPreviousValue(previousValueRed));
                    navigate(`/registrationPage/result/${resultValues['error-change-password'].trigger}`, { replace: true })
                })
        }
        dispatch(setPreviousPath('/change-password'));
    }, [previousValueRed]);

    const changePas = (value: any) => {
        console.log('Received values of form: ', value);
        setPassword(value);
        console.log({ password: value.password, confirmPassword: value.confirm })
        if (password) {
            changePassword({ password: value.password, confirmPassword: value.confirm }).unwrap() //!!!!!!!
                .then(() => {
                    navigate(`/registrationPage/result/${resultValues['success-change-password'].trigger}`, { replace: true })
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(setPreviousValue(password));
                    navigate(`/registrationPage/result/${resultValues['error-change-password'].trigger}`, { replace: true })
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
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder='Повторите пароль' />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit" >
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
    )
}

export default ChangePassword;