import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';
import styles from './ConfirmEmail.module.scss';
import VerificationInput from "react-verification-input";
import { usePostConfirmEmailMutation } from '@redux/usersApi';
import { getSavedValue } from '@redux/checkLocationSlice';
import { useNavigate } from 'react-router-dom';
import { setStateOfLoadTrue, setStateOfLoadFalse } from '@redux/isLoadingSlice';

const ConfirmEmail = () => {
    const [confirmEmail, { isLoading: confirmLoading }] = usePostConfirmEmailMutation();
    const previousValue = useSelector((state: RootState) => state.checkLocation.previousValue);
    const [errorStatus, setErrorStatus] = useState(false);
    const [value, setValue] = useState<any>('')
    const inputRef = useRef<any>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const statusImg = errorStatus ? '/images/result_icon/error.svg' : '/images/result_icon/exclamation.svg';
    const topic = errorStatus ? <>Неверный код. Введите код для восстановления аккауанта</> : <>Введите код <br /> для восстановления аккауанта</>;

    const clearInputArea = () => {
        if (inputRef.current) {
            const mainElem = inputRef.current.parentNode;
            const childrenLength = mainElem.children.length;
            for (let i = 1; i < childrenLength; i++) {
                mainElem.children[i].textContent = '';
            }
        }
    };

    useEffect(() => {
        dispatch(getSavedValue('previousValue'));
        clearInputArea();
    }, []);

    useEffect(() => {
        if (value.length === 6) {
            confirmEmail({
                email: previousValue,
                code: value
            }).unwrap()
                .then(() => {
                    setErrorStatus(false);
                    navigate('/auth/change-password', { replace: true })
                })
                .catch(() => {
                    setErrorStatus(true);
                    setValue('');
                    setTimeout(() => clearInputArea());
                })
        }
    }, [value]);

    useEffect(() => {
        if (confirmLoading) {
            dispatch(setStateOfLoadTrue());
        }
        return () => { dispatch(setStateOfLoadFalse()); }
    }, [confirmLoading]);

    return (
        <div className={styles['confirmBox']}>
            <section className={styles.confirmSection} >
                <div className={styles.confirmSecContent}>
                    <div className={styles.imgBox}>
                        <img src={statusImg} alt="statusImg" />
                    </div>
                    <h2>
                        {topic}
                    </h2>
                    <p>
                        Мы отправили вам на e-mail <span>{previousValue}</span> шестизначный код. Введите его в поле ниже.
                    </p>
                    <VerificationInput
                        inputProps={{ 'data-test-id': 'verification-input' }}
                        classNames={{
                            character: errorStatus ? 'character' : ''
                        }}
                        ref={inputRef}
                        value={value}
                        onChange={(newValue: string) => setValue(newValue)}
                    />
                    <p className={styles.message}>Не пришло письмо? Проверьте папку Спам.</p>
                </div>
            </section>
        </div>
    );
};

export default ConfirmEmail;
