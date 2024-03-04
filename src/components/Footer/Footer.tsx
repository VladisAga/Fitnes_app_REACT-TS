import { LinkFC } from '@components/LInk/LinkFC';
import styles from './Footer.module.scss';
import { Layout } from 'antd';
const { Footer } = Layout;

export const FooterFC: React.FC = () => {
    return (
        <>
            <section className={styles.footer}>
                <Footer >
                    <section className={styles.footerContent}>
                        <div className={styles.classToOrder}>
                            <LinkFC data-test-id='see-reviews' href='/feedbacks' className={styles['seeComment']}>Смотреть отзывы</LinkFC>
                        </div>
                        <section className={styles.downloadSection}>
                            <div className={styles.firstElem}><LinkFC className={styles.download} href='#'>Скачать на телофон</LinkFC>
                                <p className={styles.pro} >Доступно в PRO-тарифе</p>
                            </div>
                            <div className={styles.byWhatApp}>
                                <div><LinkFC href='#' className={styles.android}>Android OS</LinkFC></div>
                                <div><LinkFC href='#' className={styles.ios}>Apple iOS</LinkFC></div>
                            </div>
                        </section>
                    </section>
                </Footer>
            </section>
        </>
    )
}