import { createSlice } from '@reduxjs/toolkit'
export interface checkAuthState {
    auth: boolean
}

const initialState: checkAuthState = {
    auth: !!window.localStorage.getItem('token'),
}
export const checkAuthSlice = createSlice({
    name: 'checkAuth',
    initialState,
    reducers: {
        initAuth: (state) => {
            if(window.localStorage.getItem('token')) state.auth = true
        },
        setAuth: (state, action) => {
            state.auth = action.payload
        },
        logout: (state) => {
            const token = window.localStorage.getItem('token')
            if(token){
                window.localStorage.removeItem('token')
                state.auth = false
            }
        }
    },
})

export const { initAuth, setAuth, logout } = checkAuthSlice.actions;
export default checkAuthSlice.reducer;