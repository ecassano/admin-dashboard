"use client";
import { useCallback, useState } from "react";
import { CampaignForm } from "./CampaignForm";
import { CampaignsTable } from "./CampaignsTable";
import { Campaign } from "@/utils/types";
import { schema } from "@/schemas/campaign_form.schema";
import { z } from "zod";

// const campaigns: Campaign[] = [
//   {
//     id: 1,
//     descricao: "Campanha 1",
//     // link: "https://example.com/campaign1",
//     urlImagem:
//       "https://upload.wikimedia.org/wikipedia/pt/a/ac/CRVascodaGama.png",
//     urlLink: "https://example.com/campaign1",
//     dataInicial: new Date("2024-01-01"),
//     dataFinal: new Date("2024-12-31"),
//     status: true,
//     cpfProprietario: "02928257730",
//     nomeCampanha: "Campanha 1",
//   },
//   {
//     id: 2,
//     descricao: "Campanha 2",
//     // link: "https://example.com/campaign2",
//     urlImagem:
//       "https://cdn.vox-cdn.com/thumbor/taY_jiqjaZKZhXNra4x0RIrZgxo=/0x0:3801x2534/1200x800/filters:focal(1597x963:2205x1571)/cdn.vox-cdn.com/uploads/chorus_image/image/73933993/2200643906.0.jpg",
//     urlLink: "https://example.com/campaign2",
//     dataInicial: new Date("2024-02-01"),
//     dataFinal: new Date("2024-03-31"),
//     status: false,
//     cpfProprietario: "02928257730",
//     nomeCampanha: "Campanha 2",
//   },
// ];

export type FormData = z.infer<typeof schema>;

export default function Contracheque() {
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
            <h2 className="text-lg font-medium text-[var(--black)] mb-4">
              Campanha
            </h2>
            <CampaignForm
              prefilledValues={defaultCampaign}
              handleSetPrefilledValues={handleSetDefaultCampaign}
            />
          </div>
          <div className="p-8">
            <h2 className="text-lg font-medium text-[var(--black)] mb-4">
              Lista de Campanhas
            </h2>
            <CampaignsTable
              handleSetDefaultCampaign={handleSetDefaultCampaign}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
