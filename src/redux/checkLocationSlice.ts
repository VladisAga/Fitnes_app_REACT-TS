import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

export const checkLocationSlice = createSlice({
    name: 'checkLocation',
    initialState: {
        previousPath: null,
        previousValue: '',
        previousValueRed: null
    },
    reducers: {
        setPreviousPath: (state, action) => {
            state.previousPath = action.payload;
        },
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

export const { setPreviousPath, savePreviousValue, getSavedValue, setPreviousValue } = checkLocationSlice.actions;

export default checkLocationSlice.reducer;

export const selectPreviousPath = (state: any) => state.checkLocation.previousPath;

export const selectPreviousPathMemoized = createSelector(
    selectPreviousPath,
    (previousPath) => previousPath
);
