interface TokenState {
  authenticated: boolean | undefined
  refreshToken: string | undefined
  refreshTokenExpiresIn: number | undefined
  sessionId: string | undefined
  token: string | undefined
  tokenExpiresIn: number | undefined
  timeSkew: number | undefined
}

interface UserInfoState {
  name: string | undefined
  email: string | undefined
  given_name: string | undefined
  preferred_username: string | undefined
  logged: 'logging' | 'logged' | 'not-logged'
}

export type Campaign = {
  id: number
  nomeCampanha: string
  descricao: string
  urlImagem: string
  urlLink: string | null
  dataInicial: string
  dataFinal: string
  status: boolean
  cpfProprietario: string
} | null
