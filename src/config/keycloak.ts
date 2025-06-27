import { tokenActions } from '@/redux/features/token-slice'
import { userInfoActions } from '@/redux/features/user-info'
import { rehydration, store } from '@/redux/store'
import Keycloak, { KeycloakInitOptions } from 'keycloak-js'
import { toast } from 'sonner'

export const keycloak = Keycloak({
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
  credentials: {
    secret: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET,
  },
  'ssl-required': 'external',
  'confidential-port': 0,
})

let initOptions: KeycloakInitOptions = { onLoad: 'check-sso' }

const KeycloakInitialize = () => {
  keycloak.onAuthSuccess = () => {
    store.dispatch(
      userInfoActions.setUserInfo({
        // @ts-expect-error - keycloak type issues
        name: keycloak.tokenParsed?.name,
        // @ts-expect-error - keycloak type issues
        email: keycloak.tokenParsed?.email,
        // @ts-expect-error - keycloak type issues
        given_name: keycloak.tokenParsed?.given_name,
        // @ts-expect-error - keycloak type issues
        preferred_username: keycloak.tokenParsed?.preferred_username,
        logged: 'logged',
      })
    )

    store.dispatch(
      tokenActions.setToken({
        authenticated: keycloak.authenticated,
        refreshToken: keycloak.refreshToken,
        refreshTokenExpiresIn: keycloak.refreshTokenParsed?.exp,
        sessionId: keycloak.sessionId,
        token: keycloak.token,
        tokenExpiresIn: keycloak.tokenParsed?.exp,
        timeSkew: keycloak.timeSkew,
      })
    )
  }

  keycloak.onAuthRefreshSuccess = () => {
    store.dispatch(
      tokenActions.setToken({
        authenticated: keycloak.authenticated,
        refreshToken: keycloak.refreshToken,
        refreshTokenExpiresIn: keycloak.refreshTokenParsed?.exp,
        sessionId: keycloak.sessionId,
        token: keycloak.token,
        tokenExpiresIn: keycloak.tokenParsed?.exp,
        timeSkew: keycloak.timeSkew,
      })
    )
  }

  keycloak.onAuthError = () => {
    store.dispatch(tokenActions.resetToken())
    store.dispatch(userInfoActions.resetUserInfo())
    keycloak.clearToken()
  }

  keycloak.onAuthLogout = () => {
    store.dispatch(tokenActions.resetToken())
    store.dispatch(userInfoActions.resetUserInfo())
    keycloak.clearToken()
  }

  keycloak.onTokenExpired = () => {
    keycloak
      .updateToken(5)
      .success(refreshed => {
        if (refreshed) {
          toast.success('Sessão renovada')
        }
      })
      .error(() => {
        toast.error('Sessão expirada. Por favor, faça login novamente.', {
          action: {
            label: 'Fazer login',
            onClick: () => {
              keycloak.login()
            },
          },
        })
      })
  }

  keycloak.init(initOptions)
}

export const initialize = async () => {
  await rehydration()
    .then(() => {
      initOptions = {
        token: store.getState().token.token,
        refreshToken: store.getState().token.refreshToken,
        timeSkew: store.getState().token.timeSkew,
      }
    })
    .then(() => {
      KeycloakInitialize()
    })
}
