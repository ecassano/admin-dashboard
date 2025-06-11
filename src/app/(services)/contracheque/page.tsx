'use client';
// import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './styles.module.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUrlInput } from '@/components/ImageUrlInput';

// type ImagePreview = {
//   url: string;
//   file: File;
// } | null;

type FormData = {
  description: string;
  status: 'active' | 'inactive' | 'draft';
  startDate: string;
  endDate: string;
};

export default function CampaignForm() {
  // const [verticalBanner, setVerticalBanner] = useState<ImagePreview>(null);
  // const [horizontalBanner, setHorizontalBanner] = useState<ImagePreview>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
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
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Campanhas</h1>
      </header>

      <div className={styles.content}>
        <div className={styles.card}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div>
              <div className="grid w-full items-center gap-3 mb-4">
                <Label htmlFor="Title">Título</Label>
                <Input type="text" id="title" placeholder="Título da campanha" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 w-full">
              <ImageUrlInput
                id="bannerHorizontal"
                label="Banner Horizontal"
                placeholder="https://example.com/image.jpg"
                onChange={(value: string, isValid: boolean) => {
                  // Handle the value and validation state
                  console.log('Horizontal banner:', value, isValid);
                }}
              />
              <ImageUrlInput
                id="bannerVertical"
                label="Banner Vertical"
                placeholder="https://example.com/image.jpg"
                onChange={(value: string, isValid: boolean) => {
                  // Handle the value and validation state
                  console.log('Vertical banner:', value, isValid);
                }}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="description">Descrição</label>
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Descrição é obrigatória' }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="description"
                    rows={4}
                    placeholder="Digite a descrição da campanha"
                    className={errors.description ? styles.errorInput : ''}
                  />
                )}
              />
              {errors.description && (
                <span className={styles.errorMessage}>{errors.description.message}</span>
              )}
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="status">Status</label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <select {...field} id="status">
                      <option value="active">Ativo</option>
                      <option value="inactive">Inativo</option>
                      <option value="draft">Rascunho</option>
                    </select>
                  )}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="startDate">Data Inicial</label>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: 'Data inicial é obrigatória' }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      id="startDate"
                      className={errors.startDate ? styles.errorInput : ''}
                    />
                  )}
                />
                {errors.startDate && (
                  <span className={styles.errorMessage}>{errors.startDate.message}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="endDate">Data Final</label>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{
                    required: 'Data final é obrigatória',
                    validate: (value) => {
                      const startDate = watch('startDate');
                      if (startDate && value < startDate) {
                        return 'Data final deve ser posterior à data inicial';
                      }
                      return true;
                    }
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      id="endDate"
                      className={errors.endDate ? styles.errorInput : ''}
                    />
                  )}
                />
                {errors.endDate && (
                  <span className={styles.errorMessage}>{errors.endDate.message}</span>
                )}
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