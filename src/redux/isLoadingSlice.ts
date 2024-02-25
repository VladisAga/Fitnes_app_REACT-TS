import { createSlice } from '@reduxjs/toolkit';

export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState: {
        isLoading: false
    },
    reducers: {
        setStateOfLoadTrue: (state) => {
            state.isLoading = true
        },
        setStateOfLoadFalse: (state) => {
            state.isLoading = false
        }
    }
});

export const { setStateOfLoadTrue, setStateOfLoadFalse } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;

export const stateOfLoading = (state: any) => state.isLoading.isLoading;

