import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './WriteComment.module.scss';
import { Modal, Rate } from 'antd';
import { ButtonFC } from '@components/Button/Button';
import { useDispatch } from 'react-redux';
import { CloseOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { setStateOfLoadTrue, setStateOfLoadFalse } from '@redux/isLoadingSlice';
import { usePostFeedbackMutation } from '@redux/usersApi';
import { useIsSessionToken } from '../../../selectors/selectors';
import { modalInf } from '@components/Modal/modalInf';
import { TmodalInf } from '../../../types/commonTypes';
import cn from 'classnames';
import ModalFC from '../Modal';

type TWriteCommentModal = {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const WriteCommentModal: React.FC<TWriteCommentModal> = ({ isModalOpen, setIsModalOpen }) => {
    const sessionToken = useIsSessionToken();
    const authorizedToken = localStorage.getItem('token');
    const [modalInform, setModalInform] = useState<TmodalInf>({
        src: "",
        topic: "",
        btnText: "",
    });
    const [starValue, setStarValue] = useState(0);
    const [infModalState, setInfModalState] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [textValue, setTextValue] = useState('');
    const [postFeedBack, { isLoading: postFeedBackLoad }] = usePostFeedbackMutation();
    const dispatch = useDispatch();

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (event: any) => {
        setTextValue(event.target.value);
        autoExpand();
    };

    const autoExpand = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setInfModalState(false);
    }

    const writeCommentAgain = () => {
        setInfModalState(false);
        setIsModalOpen(true);
    }

    const sendFeedBack = () => {
        postFeedBack({ body: { message: textValue, rating: starValue }, token: sessionToken || authorizedToken }).unwrap()
            .then(() => {
                handleCancel();
                setInfModalState(true);
                setModalInform(modalInf.modalSuccess);
                setStarValue(0);
                setTextValue('');
            })
            .catch(() => {
                handleCancel();
                setInfModalState(true);
                setModalInform(modalInf.modalError);
            })
    }

    useEffect(() => {
        starValue > 0 ? setDisabled(false) : setDisabled(true);
    }, [starValue]);

    useEffect(() => {
        if (postFeedBackLoad) {
            dispatch(setStateOfLoadTrue());
        }
        return () => { dispatch(setStateOfLoadFalse()); }
    }, [postFeedBackLoad]);

    return (
        <>
            <Modal
                title={<>
                    <p className={styles.title}>Ваш отзыв</p>
                    <ButtonFC className={styles['btnClose']} onClick={handleCancel}><CloseOutlined /></ButtonFC>
                </>
                }
                centered open={isModalOpen} onCancel={handleCancel}>
                <section className={styles.modalBody}>
                    <Rate
                        value={starValue}
                        onChange={setStarValue}
                        character={({ value, index }) => {
                            return value && index! < value
                                ? <StarFilled style={{ color: 'rgb(250, 173, 20)' }} />
                                : <StarOutlined style={{ color: 'rgb(250, 173, 20)' }} />
                        }}
                    />
                    <textarea
                        ref={textareaRef}
                        value={textValue}
                        onChange={handleChange}
                    ></textarea>
                </section>
                <footer className={styles.modalFooter}>
                    <ButtonFC disabled={disabled} data-test-id='new-review-submit-button' onClick={sendFeedBack} className={cn(styles['senMsgBtn'], {
                        [styles['disabled']]: disabled
                    }
                    )}>Опубликовать</ButtonFC>
                </footer>
            </Modal>
            <ModalFC extraBtn={writeCommentAgain} isModalOpen={infModalState} handleOk={handleOk} modalInf={modalInform} />
        </>
    )
}

