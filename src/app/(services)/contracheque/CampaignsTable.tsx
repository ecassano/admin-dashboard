"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { STATUS_COLORS } from "@/utils/constants";
import { Campaign } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import obterCampanhasProprietario from "@/api/obterCampanhas";

type CampaignsTableProps = {
  handleSetDefaultCampaign: (campaign: Campaign) => void;
};

export const CampaignsTable = ({
  handleSetDefaultCampaign,
}: CampaignsTableProps) => {

  const query = useQuery({
    queryKey: ["campaigns"],
    queryFn: () =>
      obterCampanhasProprietario(),
  });

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
