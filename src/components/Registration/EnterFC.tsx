import styles from './EnterFC.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { GooglePlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { usePostEnterUserMutation, usePostCheckEmailMutation } from '@redux/usersApi';
import { useEffect, useState } from 'react';
import { initAuth, setAuth } from '../../redux/checkAuthSlice';
import { setPreviousPath, savePreviousValue, getSavedValue, setPreviousValue } from '@redux/checkLocationSlice';
import { setStateOfLoadTrue, setStateOfLoadFalse } from '@redux/isLoadingSlice';
import { resultValues } from '@pages/RusultPage/resultValues';
import { RootState } from '@redux/configure-store';

const EnterFC = () => {
    const dispatch = useDispatch();
    const previousPath = useSelector((state: RootState) => state.checkLocation.previousPath);
    const previousValueRed = useSelector((state: RootState) => state.checkLocation.previousValueRed);
    const [enter, { isLoading: enterLoad }] = usePostEnterUserMutation();
    const [checkEmail, { isLoading: checkEmailLoad }] = usePostCheckEmailMutation();
    const [userData, setUserData] = useState({});
    const [linkState, setLinkState] = useState(false);
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getSavedValue('previousValue'));
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate(`/main`, { replace: true, state: 'true' });
        }
    }, [navigate]);

    useEffect(() => {
        if (previousPath === '/registrationPage/result/500Error') {
            dispatch(setPreviousPath('/registrationPage'));
            checkEmail({ email: previousValueRed }).unwrap()
                .then(() => {
                    dispatch(savePreviousValue(value));
                    navigate('/confirm-email', { replace: true });
                })
                .catch((error) => {
                    if (error.data.message === "Email не найден") {
                        navigate(`/registrationPage/result/${resultValues.emailError.trigger}`, { replace: true })
                    } else {
                        dispatch(setPreviousValue(previousValueRed));
                        navigate(`/registrationPage/result/${resultValues['500Error'].trigger}`, { replace: true })
                    }
                });
        }
        dispatch(setPreviousPath('/registrationPage'));
    }, [previousValueRed]);

    const handleAddUser = async (values: any) => {
        setUserData(values);
        if (values) {
            try {
                const response = await enter({ ...values.user, password: values.password }).unwrap();
                const action = setAuth(true);
                dispatch(action);
                if (values.remember) {
                    localStorage.setItem('token', response.accessToken);
                    dispatch(initAuth());
                }
                navigate(`/main`, { replace: true, state: values.remember ? values.remember.toString() : '' });
            } catch (error: any) {
                navigate(`/registrationPage/result/${resultValues['error-login'].trigger}`, { replace: true });
            }
        }
    };

    useEffect(() => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) setLinkState(false);
    }, [value])

    const resetPassword = () => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
            checkEmail({ email: value }).unwrap()
                .then(() => {
                    dispatch(savePreviousValue(value));
                    navigate('/confirm-email', { replace: true });
                })
                .catch((error) => {
                    if (error.data.message === "Email не найден") {
                        navigate(`/registrationPage/result/${resultValues.emailError.trigger}`, { replace: true })
                    } else {
                        dispatch(setPreviousValue(value));
                        navigate(`/registrationPage/result/${resultValues['500Error'].trigger}`, { replace: true })
                    }
                });
        } else {
            setLinkState(true);
        }
    };

    useEffect(() => {
        if (enterLoad || checkEmailLoad) {
            dispatch(setStateOfLoadTrue());
        } 
        return () => {  dispatch(setStateOfLoadFalse());}
    }, [enterLoad, checkEmailLoad]);

    return (

        <section className={styles.enterForm} >
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={handleAddUser}
            >
                <Form.Item name={['user', 'email']}
                    rules={[{ type: 'email', required: true, message: '' },
                    ]}>
                    <Input addonBefore='e-mail:' value={value} onChange={(e) => setValue(e.currentTarget.value)} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '' }, ({ getFieldValue }) => ({
                        validator() {
                            if (getFieldValue('password') && getFieldValue('password').length > 7) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Пароль не менее 8 символов, с заглавной буквой и цифрой'));
                        },
                    })]}
                >
                    <Input.Password placeholder='Пароль' />
                </Form.Item>
                <Form.Item style={{ marginBottom: '26px' }}>
                    <section className={styles.memorySection}>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Запомнить меня</Checkbox>
                        </Form.Item>
                        <div>
                            <button className="login-form-forgot" disabled={linkState} onClick={resetPassword}>
                                Забыли пароль?
                            </button>
                        </div>
                    </section>
                </Form.Item>
                <Form.Item style={{ marginBottom: '16px' }}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Войти
                    </Button>
                </Form.Item>
                <Form.Item style={{ marginBottom: '0' }}>
                    <button className={styles.googleBtn}>
                        <GooglePlusOutlined />
                        <NavLink to={''}>Войти через Google</NavLink>
                    </button>
                </Form.Item>
            </Form>
        </section >
    );
}

export default EnterFC;