import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './usersApi';
import checkAuthReducer from './checkAuthSlice';
import checkLocationReducer from './checkLocationSlice';
import isLoadingReducer from './isLoadingSlice'
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
  } = createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        checkAuth: checkAuthReducer,
        checkLocation: checkLocationReducer,
        router: routerReducer,
        isLoading: isLoadingReducer
    },
    middleware: (getDefaulMiddleware) => getDefaulMiddleware().concat(usersApi.middleware, routerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const history = createReduxHistory(store);
