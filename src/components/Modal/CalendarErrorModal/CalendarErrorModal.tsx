import { TErrorModal } from '../../../types/commonTypes';
import { Modal } from 'antd';
import styles from './CalendarErrorModal.module.scss';

type TCalendarErrorModal = {
    isErrorCalendar: boolean;
    setIsErrorCalendar: (value: boolean) => void;
    modalInf: TErrorModal;
}

const CalendarErrorModal: React.FC<TCalendarErrorModal> = ({ isErrorCalendar, setIsErrorCalendar, modalInf }) => {
    const { img, text, topic, btnText } = modalInf;

    const tryAgain = () => {
        setIsErrorCalendar(false);
        window.location.reload();
    };

    return (
        <Modal centered open={isErrorCalendar} style={{ maxWidth: '384px' }}>
            <section className={styles.errorModal}>
                <div className={styles.modalFirstRow}>
                    <div>
                        <img src={img} alt="errorImg" />
                    </div>
                    <section className={styles.textSection}>
                        <p>{topic}</p>
                        <p className={styles.modalText}>{text}</p>
                    </section>
                    <div><button onClick={() => setIsErrorCalendar(false)}><img src="/images/icons/cross.svg" alt="close" /></button></div>
                </div>
                <div className={styles.modalBtnBox}><button onClick={tryAgain}>{btnText}</button></div>
            </section>
        </Modal>
    )
}

export default CalendarErrorModal;