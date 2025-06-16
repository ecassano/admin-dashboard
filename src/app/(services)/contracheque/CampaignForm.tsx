import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUrlInput } from "@/components/ImageUrlInput";
import { DatePicker } from "@/components/DatePicker";
import { useForm } from "react-hook-form";
import { Campaign, FormData } from "./page";
import { useCallback, useEffect } from "react";

type CampaignFormProps = {
  defaultValues: Campaign | null;
}

export const CampaignForm = ({ defaultValues }: CampaignFormProps) => {
  const {
    handleSubmit,
    register,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      title: defaultValues?.descricao || '',
      verticalBanner: defaultValues?.urlImagem || '',
      horizontalBanner: defaultValues?.urlImagem || '',
      description: defaultValues?.descricao || '',
      status: defaultValues?.status ? 'active' : 'inactive',
      startDate: defaultValues?.dataInicial.toISOString() || '',
      endDate: defaultValues?.dataFinal.toISOString() || '',
    }
  });

  const handleImageUrlChange = useCallback((value: string, isValid: boolean, type: 'vertical' | 'horizontal') => {
    if (isValid) {
      setValue(type === 'vertical' ? 'verticalBanner' : 'horizontalBanner', value);
    }
  }, [setValue]);

  const onSubmit = useCallback(async (data: FormData) => {
    console.log(data);
  }, []);

  useEffect(() => {
    if (defaultValues) {
      console.log(defaultValues);
      setValue('title', defaultValues.descricao);
      setValue('verticalBanner', defaultValues.urlImagem);
      setValue('horizontalBanner', defaultValues.urlImagem);
      setValue('description', defaultValues.descricao);
      setValue('status', defaultValues.status ? 'active' : 'inactive');
      setValue('startDate', defaultValues.dataInicial.toISOString());
      setValue('endDate', defaultValues.dataFinal.toISOString());
    }
  }, [defaultValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="grid w-full items-center gap-3 mb-6">
          <Label htmlFor="Title">Título</Label>
          <Input type="text" id="title" placeholder="Título da campanha" {...register('title')} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 w-full">
        <ImageUrlInput
          id="bannerHorizontal"
          label="Banner Horizontal"
          placeholder="https://example.com/image.jpg"
          onChange={(value, isValid) => handleImageUrlChange(value, isValid, 'horizontal')}
          defaultValue={defaultValues?.urlImagem}
        />
        <ImageUrlInput
          id="bannerVertical"
          label="Banner Vertical"
          placeholder="https://example.com/image.jpg"
          onChange={(value, isValid) => handleImageUrlChange(value, isValid, 'vertical')}
          defaultValue={defaultValues?.urlImagem}
        />
      </div>

      <div className="grid w-full mb-6 gap-3">
        <Label htmlFor="description">Descrição</Label>
        <Textarea className='h-24 resize-none' placeholder="Digite a descrição da campanha" id="description" {...register('description')} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-16">
        <div className="flex flex-col gap-3">
          <Label htmlFor="status" className='px-1'>Status</Label>
          <Select defaultValue="active" {...register('status')}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
              <SelectItem value="draft">Rascunho</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DatePicker
          name="startDate"
          setValue={setValue}
          defaultValue={defaultValues?.dataInicial}
        />

        <DatePicker
          name="endDate"
          setValue={setValue}
          defaultValue={defaultValues?.dataFinal}
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="bg-[var(--primary-400)] text-white hover:bg-[var(--primary-600)] cursor-pointer">
          Salvar Campanha
        </Button>
      </div>
    </form>
  )
}