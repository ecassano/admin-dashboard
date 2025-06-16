'use client';
import { useCallback, useState } from 'react';
import { CampaignForm } from './CampaignForm';
import { CampaignsTable } from './CampaignsTable';

const campaigns: Campaign[] = [
  {
    id: 1,
    descricao: "Campanha 1",
    urlImagem: "https://upload.wikimedia.org/wikipedia/pt/a/ac/CRVascodaGama.png",
    urlLink: "https://example.com/campaign1",
    dataInicial: new Date("2024-01-01"),
    dataFinal: new Date("2024-12-31"),
    status: true
  },
  {
    id: 2,
    descricao: "Campanha 2",
    urlImagem: "https://cdn.vox-cdn.com/thumbor/taY_jiqjaZKZhXNra4x0RIrZgxo=/0x0:3801x2534/1200x800/filters:focal(1597x963:2205x1571)/cdn.vox-cdn.com/uploads/chorus_image/image/73933993/2200643906.0.jpg",
    urlLink: "https://example.com/campaign2",
    dataInicial: new Date("2024-02-01"),
    dataFinal: new Date("2024-03-31"),
    status: false
  }
]

export type FormData = {
  title: string;
  verticalBanner: string;
  horizontalBanner: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  startDate: string;
  endDate: string;
  startDateOpen: boolean;
  endDateOpen: boolean;
};

export type Campaign = {
  id: number;
  descricao: string;
  urlImagem: string;
  urlLink: string;
  dataInicial: Date;
  dataFinal: Date;
  status: boolean;
}

export default function Contracheque() {
  // const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [defaultCampaign, setDefaultCampaign] = useState<Campaign | null>(null);

  const handleSetDefaultCampaign = useCallback((campaign: Campaign) => {
    setDefaultCampaign(campaign);
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 ">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-medium text-[var(--black)]">Campanhas</h1>
      </header>

      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-sm overflow-visible relative mb-10">
          <div className="p-8">
            <h2 className="text-lg font-medium text-[var(--black)] mb-4">Nova Campanha</h2>
            <CampaignForm defaultValues={defaultCampaign} />
          </div>
          <div className="p-8">
            <h2 className="text-lg font-medium text-[var(--black)] mb-4">Lista deCampanhas</h2>
            <CampaignsTable campaigns={campaigns} handleSetDefaultCampaign={handleSetDefaultCampaign} />
          </div>
        </div>
      </div>
    </div>
  );
} 