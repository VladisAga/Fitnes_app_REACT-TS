import { NavLink, useParams, useLocation } from "react-router-dom";
import { resultValues } from "./resultValues";
import styles from './ResultPage.module.scss';
import cn from 'classnames';
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';
import { setPreviousPath } from '@redux/checkLocationSlice';
import { useDispatch } from 'react-redux';

type ResultValue = {
    img: string;
    trigger: string;
    title: string;
    text: string;
    path: string;
    linkText: string;
};

export const ResultPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const previousPath = useSelector((state: RootState) => state.checkLocation.previousPath);

    useEffect(() => {
        console.log(previousPath);
        if (location.pathname === "/registrationPage/result/500Error" && previousPath === '/registrationPage') {
            dispatch(setPreviousPath('/registrationPage/result/500Error'));
        }
        if (location.pathname === "/registrationPage/result/error-change-password" && previousPath === '/change-password') {
            dispatch(setPreviousPath('/registrationPage/result/error-change-password'));
        }
        if (location.pathname === "/registrationPage/result/error" && previousPath === '/registrationPage/registration') {
            dispatch(setPreviousPath('/registrationPage/result/error'));
        }
    }, []);

    console.log(location)
    const { inf } = useParams();
    const data: ResultValue = resultValues[inf as keyof typeof resultValues];
    console.log(data);
    return (
        <div className={cn(styles['resBox'], {
            [styles['error']]: location.pathname === "/registrationPage/result/500Error"
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
                        <NavLink className={styles.resultLink} to={data.path} relative='path'>{data.linkText}</NavLink>
                    </div>
                </div>
            </section>
        </div>
    );
};
