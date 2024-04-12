import { createSlice } from '@reduxjs/toolkit'
import { http, getToken, setToken as _setToken, removeToken } from '@/utils/'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
})

const { setToken, setUserInfo, clearUserInfo } = userSlice.actions

const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await http.post('/authorizations', loginForm)
        dispatch(setToken(res.data.token))
    }
}

const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await http.get('/user/profile')
        dispatch(setUserInfo(res.data))
    }
}

export { setToken, fetchLogin, fetchUserInfo, clearUserInfo }

export default userSlice.reducer