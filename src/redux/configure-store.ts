import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";

import checkAuthReducer from './checkAuthSlice';
import checkLocationReducer from './checkLocationSlice';
import isLoadingReducer from './isLoadingSlice'
import { usersApi } from './usersApi';

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory(), savePreviousLocations: 5 });

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
