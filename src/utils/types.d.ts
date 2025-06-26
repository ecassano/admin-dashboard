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
