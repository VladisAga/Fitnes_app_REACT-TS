import { ButtonFC } from '@components/Button/Button';
import styles from './CreationCard.module.scss';

type TCreationCard = {
    date: string;
}

const CreationCard: React.FC<TCreationCard> = ({ date }) => {
    return (
        <section id='card' className={styles.card} >
            <div className={styles.cardHeader}>
                <p>Тренировки на {date}</p>
                <div><ButtonFC className={styles.closeBtn}><img className={styles.closeIcon} src="/images/icons/cross2.svg" alt="close" /></ButtonFC></div>
            </div>
            <div className={styles.cardBody}>
                {<div className={styles.noData}>
                    <p>Нет активных тренировок</p>
                    <div><img src="/images/icons/emptyList.svg" alt="emptyList" /></div>
                </div>}
            </div>
            <div className={styles.cardFooter}>
                <ButtonFC className={styles.createBtn}>Создать тренировку</ButtonFC>
            </div>
        </section>
    )
}

export default CreationCard;