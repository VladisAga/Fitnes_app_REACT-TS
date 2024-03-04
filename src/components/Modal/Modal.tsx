import { Modal } from 'antd';
import styles from './Modal.module.scss';
import { ButtonFC } from '@components/Button/Button';
import { TmodalInf } from '../../types/commonTypes';
import cn from 'classnames';

type TModalFC = {
    isModalOpen: boolean;
    handleOk: () => void;
    modalInf: TmodalInf;
    style?: object;
    extraBtn?: () => void;
}

const ModalFC: React.FC<TModalFC> = ({ isModalOpen, handleOk, modalInf, extraBtn }) => {
    const { src, topic, text, btnText, btnTryAgain, customStyle } = modalInf;
    return (
        <Modal centered open={isModalOpen} >
            <section className={styles.modalInside} >
                <div className={styles.imgBox}>
                    <img src={src} alt="error" />
                </div>
                <p className={styles.errorTopic}>{topic}</p>
                {btnText && <p className={styles.errorText}>{text}</p>}
                <div className={styles.btnArea} style={btnText === 'Отлично' ? customStyle : {}}>
                    {btnTryAgain && <ButtonFC onClick={extraBtn} data-test-id='write-review-not-saved-modal' style={customStyle} className={styles['btn']} >{btnTryAgain}</ButtonFC>}
                    <ButtonFC onClick={handleOk} style={btnText === 'Отлично' ? customStyle : {}} className={cn(styles['btn'], {
                        [styles['btnTryAgain']]: btnTryAgain
                    })}>{btnText}</ButtonFC>
                </div>
            </section>
        </Modal >
    );
};

export default ModalFC;