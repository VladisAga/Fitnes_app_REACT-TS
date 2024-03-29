import { LinkFC } from '@components/LInk/LinkFC';
import styles from './CalendarPage.module.scss';
import Settings from '@components/SettingsFC/Settings';
import { useEffect, useRef, useState } from 'react';
import { useLazyGetTrainingListQuery } from '@redux/usersApi';
import { useIsSessionToken } from '../../selectors/selectors';
import { setStateOfLoadTrue, setStateOfLoadFalse } from '@redux/isLoadingSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModalFC from '@components/Modal/Modal';
import { modalInf } from '@components/Modal/modalInf';
import CalendarErrorModal from '@components/Modal/CalendarErrorModal/CalendarErrorModal';
import { errorCalendarValue } from '@components/Modal/CalendarErrorModal/errorCalendarValue';
import CalendarFC from '@components/CalendarFC/CalendarFC';

const CalendarPage = () => {
    const sessionToken = useIsSessionToken();
    const authorizedToken = localStorage.getItem('token');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isErrorCalendar, setIsErrorCalendar] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const calendarRef = useRef<HTMLDivElement>(null);

    const [getTrainingList, { isFetching: calendarLoading }] = useLazyGetTrainingListQuery();

    useEffect(() => {
        getTrainingList(sessionToken || authorizedToken).unwrap()
            .then(() => { })
            .catch((error) => {
                if (error.status === 500) {
                    setIsModalOpen(true);
                } else {
                    setIsErrorCalendar(true);
                }
            })
    }, [authorizedToken, getTrainingList, sessionToken]);

    useEffect(() => {
        if (calendarLoading) {
            dispatch(setStateOfLoadTrue());
        }
        return () => { dispatch(setStateOfLoadFalse()) }
    }, [calendarLoading, dispatch]);

    const handleOk = () => {
        setIsModalOpen(false);
        navigate('/main', { replace: true })
    };

    return (
        <section className={styles.calendar}>
            <header className={styles.calendarHeader}>
                <section className={styles.topicLinks} >
                    <LinkFC href='/main' className={styles.linkColor}>Главная</LinkFC>
                    <span className={styles.divider}>/</span>
                    <LinkFC href='/calendar'>Календарь</LinkFC>
                </section>
                <Settings className={styles.calendarSettings} />
            </header>
            <section ref={calendarRef} className={styles.calendarSection}>
                <CalendarFC />
            </section>
            <ModalFC isModalOpen={isModalOpen} handleOk={handleOk} modalInf={modalInf.modalErrorWithMan} />
            <CalendarErrorModal modalInf={errorCalendarValue.openCalendarValue} isErrorCalendar={isErrorCalendar} setIsErrorCalendar={setIsErrorCalendar} />
        </section>
    )
}

export default CalendarPage;

