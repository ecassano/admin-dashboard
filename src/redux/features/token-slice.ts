import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TokenState } from '@/utils/types'

const initialState: TokenState = {
  authenticated: undefined,
  refreshToken: undefined,
  refreshTokenExpiresIn: undefined,
  sessionId: undefined,
  token: undefined,
  tokenExpiresIn: undefined,
  timeSkew: undefined,
}

export const token = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<TokenState>) => {
      state.authenticated = action.payload.authenticated
      state.refreshToken = action.payload.refreshToken
      state.refreshTokenExpiresIn = action.payload.refreshTokenExpiresIn
      state.sessionId = action.payload.sessionId
      state.token = action.payload.token
      state.tokenExpiresIn = action.payload.tokenExpiresIn
      state.timeSkew = action.payload.timeSkew
    },
    resetToken: () => {
      return initialState
    },
  },
})

export const tokenActions = token.actions
export default token.reducer
