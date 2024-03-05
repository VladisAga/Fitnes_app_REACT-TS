import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './configure-store';

export const checkLocationSlice = createSlice({
    name: 'checkLocation',
    initialState: {
        previousPath: null,
        previousValue: '',
        previousValueRed: null,

    },
    reducers: {
        setPreviousValue: (state, action) => {
            state.previousValueRed = action.payload;
        },
        savePreviousValue: (state, action) => {
            localStorage.setItem('previousValue', action.payload)
        },
        getSavedValue: (state, action) => {
            const prev = localStorage.getItem(action.payload);
            if (prev) state.previousValue = prev
        }
    },
});

export const { savePreviousValue, getSavedValue, setPreviousValue } = checkLocationSlice.actions;

export default checkLocationSlice.reducer;

export const selectPreviousPath = (state: RootState) => state.checkLocation.previousPath;

export const selectPreviousPathMemoized = createSelector(
    selectPreviousPath,
    (previousPath) => previousPath
);
