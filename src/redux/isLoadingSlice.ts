import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false
};

export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState,
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
