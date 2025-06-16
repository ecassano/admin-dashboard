'use client';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';
import { ImageUrlInput } from '@/components/ImageUrlInput';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

type FormData = {
  description: string;
  status: 'active' | 'inactive' | 'draft';
  startDate: string;
  endDate: string;
};

export default function CampaignForm() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  // const [verticalBanner, setVerticalBanner] = useState<ImagePreview>(null);
  // const [horizontalBanner, setHorizontalBanner] = useState<ImagePreview>(null);

  const {
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      description: '',
      status: 'active',
      startDate: '',
      endDate: '',
    }
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 ">
      <header className={styles.header}>
        <h1>Campanhas</h1>
      </header>

      <div className={styles.content}>
        <div className="bg-white rounded-lg shadow-sm overflow-visible relative mb-">
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div>
              <div className="grid w-full items-center gap-3 mb-6">
                <Label htmlFor="Title">Título</Label>
                <Input type="text" id="title" placeholder="Título da campanha" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 w-full">
              <ImageUrlInput
                id="bannerHorizontal"
                label="Banner Horizontal"
                placeholder="https://example.com/image.jpg"
                onChange={(value: string, isValid: boolean) => {
                  console.log('Horizontal banner:', value, isValid);
                }}
              />
              <ImageUrlInput
                id="bannerVertical"
                label="Banner Vertical"
                placeholder="https://example.com/image.jpg"
                onChange={(value: string, isValid: boolean) => {
                  console.log('Vertical banner:', value, isValid);
                }}
              />
            </div>

            <div className="grid w-full mb-6 gap-3">
              <Label htmlFor="description">Descrição</Label>
              <Textarea className='h-24 resize-none' placeholder="Digite a descrição da campanha" id="description" />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-16">
              <div className="flex flex-col gap-3">
                <Label htmlFor="status" className='px-1'>Status</Label>
                <Select>
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


              <div className="flex flex-col gap-3">
                <Label className="px-1">
                  Data de Início
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Selecione a data"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date)
                        setOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col gap-3">
                <Label className="px-1">
                  Data de Término
                </Label>
                <Popover open={endOpen} onOpenChange={setEndOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="endDate"
                      className="w-full justify-between font-normal"
                    >
                      {endDate ? endDate.toLocaleDateString() : "Selecione a data"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setEndDate(date)
                        setEndOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.primaryButton}>
                Salvar Campanha
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 