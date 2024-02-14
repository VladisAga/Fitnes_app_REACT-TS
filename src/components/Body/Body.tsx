import cn from 'classnames';
import styles from './Body.module.scss';
// import React, { ReactNode } from 'react';
import { Layout, } from 'antd';
import { Button } from '@components/Button/Button';
import { FooterFC } from '@components/Footer/Footer';
const { Content } = Layout;

interface IBody {

}

export const Body: React.FC<IBody> = () => {
    return (
        <>
            <section className={styles.body}>
                <Content >
                    <section className={styles.content}>
                        <div className={styles.yourAbilityWIthUs}>
                            <ul className={styles.yourAbility}>
                                <li>
                                    С CleverFit ты сможешь:
                                </li>
                                <li>
                                    планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;
                                </li>
                                <li>
                                    отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами и рекордами;
                                </li>
                                <li>
                                    создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках;
                                </li>
                                <li>
                                    выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.
                                </li>
                            </ul>
                        </div>
                        <div className={styles.slogan}>
                            <p className={styles.textSlogan}>
                                CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                            </p>
                        </div>
                        <div className={styles.tasks}>
                            <div>
                                <p>Расписание тренировки</p>
                                <Button className={cn(styles['button'], styles['btn1'])}>Тренировки</Button>
                            </div>
                            <div>
                                <p>Назначить кадендарь</p>
                                <Button className={cn(styles['button'], styles['btn2'])}>Календарь</Button>
                            </div>
                            <div>
                                <p>Заполнить профиль</p>
                                <Button className={cn(styles['button'], styles['btn3'])}>Профиль</Button>
                            </div>
                        </div>
                    </section>
                    <FooterFC />
                </Content>
            </section>
        </>
    )
}