import { NavLink, useLocation, useParams } from "react-router-dom";
import cn from 'classnames';

import { resultValues } from "./resultValues";

import styles from './ResultPage.module.scss';

type ResultValue = {
    img: string;
    trigger: string;
    title: string;
    text: string;
    path: string;
    linkText: string;
    testAttribut: string;
};

export const ResultPage = () => {
    const location = useLocation();

    const { inf } = useParams();
    const data: ResultValue = resultValues[inf as keyof typeof resultValues];
    return (
        <div className={cn(styles.resBox, {
            [styles.error]: location.pathname === "/result/error-check-email"
        })}>
            <section className={styles.resultSection} >
                <div className={styles.resultSecContent}>
                    <div className={styles.imgBox}>
                        <img src={data.img} alt="statusImg" />
                    </div>
                    <h2>
                        {data.title}
                    </h2>
                    <p>
                        {data.text}
                    </p>
                    <div className={styles.linkBox}>
                        <NavLink data-test-id={data.testAttribut} className={styles.resultLink} to={data.path} relative='path'>{data.linkText}</NavLink>
                    </div>
                </div>
            </section>
        </div>
    );
};
