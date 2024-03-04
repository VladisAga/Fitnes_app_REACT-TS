import { useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';

export const usePreviousLocation = () => useSelector((state: RootState) => state.router.previousLocations);;

export const usePreviousValue = () => useSelector((state: RootState) => state.checkLocation.previousValue);;

export const useIsAuthenticated = () => useSelector((state: RootState) => state.checkAuth.auth);

export const usePreviousValueRed = () => useSelector((state: RootState) => state.checkLocation.previousValueRed);

export const useIsSessionToken = () => useSelector((state: RootState) => state.checkAuth.token);
