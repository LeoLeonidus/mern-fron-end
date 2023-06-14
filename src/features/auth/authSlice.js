import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null} ,
    reducers: {
        setCredentials: (state,action) => {
            const {accessToken} = action.payload
            state.token = accessToken
            //console.log("authSlice accessToken=",accessToken,"----------");
        },
        logout: (state,action) => {
            state.token = null
        },
    }
})

export const {setCredentials,logout} = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token