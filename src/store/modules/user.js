import { createSlice } from '@reduxjs/toolkit'
import { http } from '@/utils/'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: ''
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        }
    }
})

const { setToken } = userSlice.actions

const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await http.post('/authorizations', loginForm)
        dispatch(setToken(res.data.token))
    }
}

export { setToken, fetchLogin }

export default userSlice.reducer