'use client';
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { STATUS_COLORS } from "@/utils/constants";
import { Campaign } from "./page";

type CampaignsTableProps = {
  campaigns: Campaign[];
  handleSetDefaultCampaign: (campaign: Campaign) => void;
}

export const CampaignsTable = ({ campaigns, handleSetDefaultCampaign }: CampaignsTableProps) => {
  return (
    <Table>
      <TableCaption>Campanhas</TableCaption>
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
        {campaigns.map((campaign) => (
          <TableRow key={campaign.id} className="cursor-pointer" onClick={() => handleSetDefaultCampaign(campaign)}>
            <TableCell className="font-medium">{campaign.id}</TableCell>
            <TableCell className="font-medium">{campaign.descricao}</TableCell>
            <TableCell>{campaign.urlLink}</TableCell>
            <TableCell>
              <Badge className={STATUS_COLORS[campaign.status ? 'active' : 'inactive']}>{campaign.status ? 'Ativa' : 'Inativa'}</Badge>
            </TableCell>
            <TableCell className="text-right">{campaign.dataInicial.toLocaleDateString('pt-BR')}</TableCell>
            <TableCell className="text-right">{campaign.dataFinal.toLocaleDateString('pt-BR')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}