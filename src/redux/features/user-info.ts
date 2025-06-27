import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserInfoState } from '@/utils/types'

const initialState: UserInfoState = {
  name: undefined,
  email: undefined,
  given_name: undefined,
  preferred_username: undefined,
  logged: 'not-logged',
}

export const userInfo = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoState>) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.given_name = action.payload.given_name
      state.preferred_username = action.payload.preferred_username
      state.logged = action.payload.logged
    },
    setLogged: (state, action: PayloadAction<UserInfoState['logged']>) => {
      state.logged = action.payload
    },
    resetUserInfo: () => {
      return initialState
    },
  },
})

export const userInfoActions = userInfo.actions
export default userInfo.reducer
