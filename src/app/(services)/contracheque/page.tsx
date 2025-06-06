'use client';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './styles.module.css';

type ImagePreview = {
  url: string;
  file: File;
} | null;

type FormData = {
  description: string;
  status: 'active' | 'inactive' | 'draft';
  startDate: string;
  endDate: string;
};

export default function CampaignForm() {
  const [verticalBanner, setVerticalBanner] = useState<ImagePreview>(null);
  const [horizontalBanner, setHorizontalBanner] = useState<ImagePreview>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setImage: (preview: ImagePreview) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({
          url: reader.result as string,
          file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    if (verticalBanner?.file) formData.append('verticalBanner', verticalBanner.file);
    if (horizontalBanner?.file) formData.append('horizontalBanner', horizontalBanner.file);
    formData.append('description', data.description);
    formData.append('status', data.status);
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);

    console.log('Form submitted:', {
      ...data,
      verticalBanner: verticalBanner?.file.name,
      horizontalBanner: horizontalBanner?.file.name
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Nova Campanha</h1>
      </header>

      <div className={styles.content}>
        <div className={styles.card}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.imageUploads}>
              <div className={styles.uploadField}>
                <label>Banner Vertical</label>
                <div className={styles.uploadArea}>
                  {verticalBanner ? (
                    <div className={styles.previewContainer}>
                      <img src={verticalBanner.url} alt="Preview vertical" className={styles.preview} />
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => setVerticalBanner(null)}
                      >
                        Remover
                      </button>
                    </div>
                  ) : (
                    <div className={styles.uploadPlaceholder}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setVerticalBanner)}
                      />
                      <p>Clique ou arraste a imagem aqui</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.uploadField}>
                <label>Banner Horizontal</label>
                <div className={styles.uploadArea}>
                  {horizontalBanner ? (
                    <div className={styles.previewContainer}>
                      <img src={horizontalBanner.url} alt="Preview horizontal" className={styles.preview} />
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => setHorizontalBanner(null)}
                      >
                        Remover
                      </button>
                    </div>
                  ) : (
                    <div className={styles.uploadPlaceholder}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setHorizontalBanner)}
                      />
                      <p>Clique ou arraste a imagem aqui</p>
                    </div>
                  )}
                </div>
              </div>
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