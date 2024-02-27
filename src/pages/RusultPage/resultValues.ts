export const resultValues = {
    'error-login': {
        img: '/images/result_icon/rejection.svg',
        trigger: 'error-login',
        title: 'Вход не выполнен',
        text: 'Что-то пошло не так. Попробуйте еще раз',
        path: '/auth',
        linkText: 'Повторить',
        testAttribut: 'login-retry-button'
    },
    'error-user-exist': {
        img: '/images/result_icon/error.svg',
        trigger: 'error-user-exist',
        title: 'Данные не сохранились',
        text: 'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail',
        path: '/auth/registration',
        linkText: 'Назад к регистрации',
        testAttribut: 'registration-back-button'
    },
    'error': {
        img: '/images/result_icon/error.svg',
        trigger: 'error',
        title: 'Данные не сохранились',
        text: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте еще раз.',
        path: '/auth/registration',
        linkText: 'Повторить',
        testAttribut: 'registration-retry-button'
    },
    'success': {
        img: '/images/result_icon/success.svg',
        trigger: 'success',
        title: 'Регистрация успешна',
        text: 'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.',
        path: '/auth',
        linkText: 'Войти',
        testAttribut: 'registration-enter-button'
    },
    'success-change-password': {
        img: '/images/result_icon/success.svg',
        trigger: 'success-change-password',
        title: 'Пароль успешно изменен',
        text: 'Теперь можно войти в аккаунт, используя свой логин и новый пароль',
        path: '/auth',
        linkText: 'Вход',
        testAttribut: 'change-entry-button'
    },
    'error-change-password': {
        img: '/images/result_icon/error.svg',
        trigger: 'error-change-password',
        title: 'Данные не сохранились',
        text: 'Что-то пошло не так. Попробуйте ещё раз',
        path: '/auth/change-password',
        linkText: 'Повторить',
        testAttribut: 'change-retry-button'
    },
    'error-check-email-no-exist': {
        img: '/images/result_icon/error.svg',
        trigger: 'error-check-email-no-exist',
        title: 'Такой e-mail не зарегистрирован',
        text: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.',
        path: '/auth',
        linkText: 'Попробовать снова',
        testAttribut: 'check-retry-button'
    },
    'error-check-email': {
        img: '/images/result_icon/wrongMan.svg',
        trigger: 'error-check-email',
        title: 'Что-то пошло не так',
        text: 'Произошла ошибка, попробуйте отправить форму ещё раз.',
        path: '/auth',
        linkText: 'Назад',
        testAttribut: 'check-back-button'
    }
};