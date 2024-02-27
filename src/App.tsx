import style from './App.module.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { MainPage } from '@pages/main-page';
import ConfirmEmail from '@pages/ConfirmEmail/ConfirmEmail';
import ChangePassword from '@pages/ChangePassword/ChangePassword';
import RegistrationPage from '@pages/RegistrationPage/RegistrationPage';
import { ResultPage } from '@pages/RusultPage/ResultPage';
import { HistoryRouter as Router } from "redux-first-history/rr6";
import Loader from '@components/Loader/Loader';
import { RootState } from '@redux/configure-store';
import { useSelector } from 'react-redux';

const App = () => {
    const isLoading = useSelector((state: RootState) => state.isLoading.isLoading);

    return (
        <>
            <div className={style.backImgRoutes}>
                <Loader isLoading={isLoading} />
                <Router history={history}>
                    <Routes >
                        <Route path='/auth' element={<RegistrationPage />} />
                        <Route path="/" element={<Navigate to="/auth" />} />
                        <Route path='/main' element={<MainPage />} />
                        <Route path='/auth/registration' element={<RegistrationPage keyValue='2' />} />
                        <Route path='/result/:inf' element={<ResultPage />} />
                        <Route path='/auth/confirm-email' element={<ConfirmEmail />} />
                        <Route path='/auth/change-password' element={<ChangePassword />} />
                    </Routes>
                </Router >
            </div>
        </>
    )
}

export default App;