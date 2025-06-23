"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { STATUS_COLORS } from "@/utils/constants";
import { Campaign } from "./page";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import obterCampanhasProprietario from "@/api/obterCampanhas";

type CampaignsTableProps = {
  campaigns: Campaign[];
  handleSetDefaultCampaign: (campaign: Campaign) => void;
};

export const CampaignsTable = ({
  campaigns,
  handleSetDefaultCampaign,
}: CampaignsTableProps) => {
  // const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["campaigns"],
    queryFn: () =>
      obterCampanhasProprietario(
        "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJMWUFNbUUwVUZBd1hyUXJGbEgwSlNrMmtCR3FSblFiMDFWRG55a3R1UE5NIn0.eyJqdGkiOiIzNjRmODFmNy0yZTI0LTRiOGMtYmUxYS03MWU1MGMzNDg3MjkiLCJleHAiOjE3NTA3MDA2NDAsIm5iZiI6MCwiaWF0IjoxNzUwNzAwMDQwLCJpc3MiOiJodHRwczovL2F1dGgtaWRyaW9ob20uYXBwcy5yaW8uZ292LmJyL2F1dGgvcmVhbG1zL2lkcmlvX2NpZGFkYW8iLCJhdWQiOlsiYnJva2VyIiwiYWNjb3VudCJdLCJzdWIiOiI2MGZlMWE0Yi1mMmUyLTQyN2QtODFiMC1kZTVhMGM4ZDU1YmQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJtaW5oYXNlbXByZXNhcy5hcHBzLnJpby5nb3YuYnIiLCJub25jZSI6ImJiMTVlMmEyLTE3YmMtNDM3NS05MTBkLTBjNzhlMTAzZTA3MyIsImF1dGhfdGltZSI6MTc1MDY5ODI0MCwic2Vzc2lvbl9zdGF0ZSI6IjUwY2I0MTBkLTgxYjUtNDY5Yy04YjI4LTFiMWRmNzlkYThiMSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9taW5oYXNlbXByZXNhc2hvbS5hcHBzLm9jcC5yaW8uZ292LmJyIiwiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiaHR0cHM6Ly9taW5oYXNlbXByZXNhc2Rldi5hcHBzLm9jcC5yaW8uZ292LmJyIiwiaHR0cHM6Ly9hcGktbWluaGFzZW1wcmVzYXNob20uYXBwcy5vY3AucmlvLmdvdi5iciIsImh0dHBzOi8vYXBpLW1pbmhhc2VtcHJlc2FzZGV2LmFwcHMub2NwLnJpby5nb3YuYnIiLCJodHRwOi8vbG9jYWxob3N0IiwiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImNhcmlvY2EtcmlvIiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYnJva2VyIjp7InJvbGVzIjpbInJlYWQtdG9rZW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkVEVUFSRE8gQU5UT05JTyBDQVNTQU5PIERFIFPDgSIsInByZWZlcnJlZF91c2VybmFtZSI6IjE2MjMyMzUwNzMxIiwiZ2l2ZW5fbmFtZSI6IkVEVUFSRE8iLCJmYW1pbHlfbmFtZSI6IkFOVE9OSU8gQ0FTU0FOTyBERSBTw4EiLCJlbWFpbCI6ImVkdWFyZG9jYXNzYW5vZGVzYUB1b2wuY29tLmJyIn0.sSBlMWysqOC-vMrgAqwLwjWBvTVvKShw9QJ7E08seUYd82Wh9aFNJ6KfypFh-pTdvl3SgvvRnYbXFXBM3wEvyWBN_wCr33rQfZL5Zrp-uvrLu07QTc-LU6gbj8GOqHa_5uZX_w69VW16J3hCfNoyXP5tXOTgpGiZZDppqa2KrbVE-incvFrwe69oF_igQ5XpZlfKfiV1t1_kyTtp1rFGWmaHDxc-mPAU7dYb6t5UByph_xOIduMAG1Kl-8hIKFekqAQv8d3V6LA556HMKsA6Ub0cHTkoL_ZM_ypa9ANAjNTNlVL7V4CyOSeWB4BG1Yy4ptPEDzEe422WpdGIUOl7BQ"
      ),
  });

  // const mutation = useMutation({
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ["campaigns"] });
  //   },
  // });

  console.log(query.data);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead className="w-[100px]">Campanha</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Data Inicial</TableHead>
          <TableHead className="text-right">Data Final</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {query.data?.map((campaign) => {
          if (!campaign) return null;
          return (
            <TableRow
              key={campaign.id}
              className="cursor-pointer"
              onClick={() => handleSetDefaultCampaign(campaign)}
            >
              <TableCell className="font-medium">{campaign.id}</TableCell>
              <TableCell className="font-medium">
                {campaign.descricao}
              </TableCell>
              <TableCell>{campaign.urlLink}</TableCell>
              <TableCell>
                <Badge
                  className={
                    STATUS_COLORS[campaign.status ? "active" : "inactive"]
                  }
                >
                  {campaign.status ? "Ativa" : "Inativa"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {new Date(campaign.dataInicial).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell className="text-right">
                {new Date(campaign.dataFinal).toLocaleDateString("pt-BR")}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
