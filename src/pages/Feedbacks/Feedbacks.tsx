import { LinkFC } from '@components/LInk/LinkFC';
import styles from './Feedbacks.module.scss';
import { ButtonFC } from '@components/Button/Button';
import { useIsSessionToken } from '../../selectors/selectors';
import { useGetFeedbacksQuery } from '@redux/usersApi';
import { useNavigate } from 'react-router-dom';
import { logout } from '@redux/checkAuthSlice';
import { useDispatch } from 'react-redux';
import ModalFC from '@components/Modal/Modal';
import { useEffect, useState } from 'react';
import { setStateOfLoadTrue, setStateOfLoadFalse } from '@redux/isLoadingSlice';
import { TComments } from '../../types/commonTypes';
import CommentsList from '@components/CommentsList/CommentsList';
import { WriteCommentModal } from '../../components/Modal/WriteCommentModal/WriteCommentModal';
import { modalInf } from '@components/Modal/modalInf';

const Feedbacks = () => {
    const sessionToken = useIsSessionToken();
    const authorizedToken = localStorage.getItem('token');
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMesModalOpen, setIsMesModalOpen] = useState(false);
    const { data = [] as any[], error, isFetching: feedBackLoading } = useGetFeedbacksQuery(authorizedToken || sessionToken);
    const [comments, setComments] = useState<TComments[]>([]);
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        if (error && ('status' in error)) {
            if (error.status === 403) {
                dispatch(logout());
                navigation('/auth', { replace: true });
            } else {
                setIsModalOpen(true);
            }
        };
    }, [error, dispatch, navigation]);

    useEffect(() => {
        const sortedData = JSON.parse(JSON.stringify(data)).sort((elem1: TComments, elem2: TComments) => {
            const date1 = new Date(elem1.createdAt);
            const date2 = new Date(elem2.createdAt);
            if (date1 > date2) return -1;
            if (date1 < date2) return 1;
            return 0;
        });
        setComments(sortedData)
    }, [feedBackLoading]);

    const handleOk = () => {
        setIsModalOpen(false);
        navigation('/main', { replace: true })
    };

    const openMessageModal = () => {
        setIsMesModalOpen(true);
    }

    useEffect(() => {
        if (feedBackLoading) {
            dispatch(setStateOfLoadTrue());
        }
        return () => { dispatch(setStateOfLoadFalse()); }
    }, [feedBackLoading]);

    return (
        <section className={styles.feedbacks}>
            <header>
                <section className={styles.topicLinks} style={data ? { marginBottom: '24px' } : { marginBottom: '326px' }}>
                    <LinkFC href='/main' className={styles['linkColor']}>Главная</LinkFC>
                    <span className={styles.divider}>/</span>
                    <LinkFC href='/main'>Отзывы пользователей</LinkFC>
                </section>
            </header>
            {!data && <section className={styles.noComments}>
                <div className={styles.liveComment}>
                    <h3>Оставьте свой отзыв первым</h3>
                    <p>
                        Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь своим мнением и опытом с другими пользователями, и помогите им сделать правильный выбор.
                    </p>
                </div>
                <ButtonFC data-test-id='write-review' onClick={openMessageModal} className={styles['btnComment']}>Написать отзыв</ButtonFC>
            </section>}
            {data &&
                <div className={styles.commentsArea}>
                    <CommentsList comments={comments} showComments={showComments} />
                    <section className={styles.commentManage}>
                        <ButtonFC data-test-id='write-review' onClick={openMessageModal} className={styles['writeComment']}>Написать отзыв</ButtonFC>
                        <p data-test-id='all-reviews-button' onClick={() => setShowComments(!showComments)}>{showComments ? <>Свернуть все отзывы</> : <>Развернуть все отзывы</>}</p>
                    </section>
                </div>}
            <ModalFC isModalOpen={isModalOpen} handleOk={handleOk} modalInf={modalInf.modalErrorWithMan} />
            <WriteCommentModal isModalOpen={isMesModalOpen} setIsModalOpen={setIsMesModalOpen} />
        </section>
    )
};

export default Feedbacks;