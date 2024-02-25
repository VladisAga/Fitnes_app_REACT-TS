
import { Provider } from 'react-redux';
import style from './App.module.scss';

import { Route, Routes, Navigate } from 'react-router-dom';

import { store, history } from '@redux/configure-store';
import { MainPage } from '@pages/main-page';
import ConfirmEmail from '@pages/ConfirmEmail/ConfirmEmail';
import ChangePassword from '@pages/ChangePassword/ChangePassword';
import RegistrationPage from '@pages/RegistrationPage/RegistrationPage';
import { ResultPage } from '@pages/RusultPage/ResultPage';
import { HistoryRouter as Router } from "redux-first-history/rr6";
import Loader from '@components/Loader/Loader';

const App = () => {
    return (
        <>
            <Provider store={store}>           
                    <div className={style.backImgRoutes}>
                    <Loader />
                        <Router history={history}>
                            <Routes >
                                <Route path='/registrationPage' element={<RegistrationPage />} />
                                <Route path="/" element={<Navigate to="/registrationPage" />} />
                                <Route path='/main' element={<MainPage />} />
                                <Route path='/registrationPage/registration' element={<RegistrationPage keyValue='2' />} />
                                <Route path='/registrationPage/result/:inf' element={<ResultPage />} />
                                <Route path='/confirm-email' element={<ConfirmEmail />} />
                                <Route path='/change-password' element={<ChangePassword />} />
                            </Routes>
                        </Router >
                    </div>
            </Provider>

        </>
    )
}

export default App;