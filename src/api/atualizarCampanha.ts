import { Campaign } from '@/utils/types'

export const atualizarCampanha = async (campanha: Campaign) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/atualizarServico`,
    {
      method: 'POST',
      body: JSON.stringify(campanha),
    }
  )
  return response.json()
}
