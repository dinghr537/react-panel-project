import { createSlice } from '@reduxjs/toolkit'
import { http, getToken, setToken as _setToken } from '@/utils/'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || ''
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
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