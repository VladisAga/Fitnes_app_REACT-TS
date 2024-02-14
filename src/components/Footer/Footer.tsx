// import cn from 'classnames';
import { Link } from '@components/LInk/Link';
import styles from './Footer.module.scss';
import { Layout } from 'antd';
const { Footer } = Layout;
interface IFooter {

}

export const FooterFC: React.FC<IFooter> = () => {
    return (
        <>
            <section className={styles.footer}>
                <Footer >
                    <section className={styles.footerContent}>
                        <div className={styles.classToOrder}>
                            <Link href='#' className={styles['seeComment']}>Смотреть отзывы</Link>
                        </div>
                        <section className={styles.downloadSection}>
                            <div className={styles.firstElem}><Link className={styles.download} href='#'>Скачать на телофон</Link>
                                <p className={styles.pro}>Доступно в PRO-тарифе</p>
                            </div>
                            <div className={styles.byWhatApp}>
                                <div><Link href='#' className={styles.android}>Android OS</Link></div>
                                <div><Link href='#' className={styles.ios}>Apple iOS</Link></div>
                            </div>
                        </section>
                    </section>
                </Footer>
            </section>
        </>

    )
}