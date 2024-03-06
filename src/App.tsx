import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '@components/Loader/Loader';
import ChangePassword from '@pages/ChangePassword/ChangePassword';
import ConfirmEmail from '@pages/ConfirmEmail/ConfirmEmail';
import Feedbacks from '@pages/Feedbacks/Feedbacks';
import { MainPage } from '@pages/main-page';
import RegistrationPage from '@pages/RegistrationPage/RegistrationPage';
import { ResultPage } from '@pages/RusultPage/ResultPage';
import { history } from '@redux/configure-store';
import { stateOfLoading } from '@redux/isLoadingSlice';
import { HistoryRouter as Router } from "redux-first-history/rr6";

import MainLayout from './layouts/MainLayout/MainLayout';
import { routes } from './routes/routes';

import style from './App.module.scss';

const App = () => {
    const isLoading = useSelector(stateOfLoading);

    return (
        <>
            <div className={style.backImgRoutes}>
                <Loader isLoading={isLoading} />
                <Router history={history}>
                    <Routes >
                        <Route path={routes.AUTH_PATH} element={<RegistrationPage />} />
                        <Route path={routes.DEFAULT_PATH} element={<Navigate to={routes.AUTH_PATH} />} />
                        <Route element={<MainLayout />}>
                            <Route path={routes.MAIN_PATH} element={<MainPage />} />
                            <Route path={routes.FEEDBACKS_PAGE} element={<Feedbacks />} />
                        </Route>
                        <Route path={routes.REGISTRATION_PATH} element={<RegistrationPage keyValue='2' />} />
                        <Route path={routes.RESULT_PATH} element={<ResultPage />} />
                        <Route path={routes.CONFIRM_EMAIL_PATH} element={<ConfirmEmail />} />
                        <Route path={routes.CHANGE_PASSWORD_PATH} element={<ChangePassword />} />
                    </Routes>
                </Router >
            </div>
        </>
    )
}

export default App;
