import { Campaign } from "@/app/(services)/contracheque/page";

const obterCampanhasProprietario = async (
  token: string
): Promise<Campaign[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/obterServicosPorCpfProprietario/${token}`
  );
  return response.json();
};

export default obterCampanhasProprietario;
