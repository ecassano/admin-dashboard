import { z } from 'zod'

export const schema = z
  .object({
    id: z.number().optional().nullable(),
    title: z
      .string()
      .max(15, { message: 'O título deve ter no máximo 15 caracteres' })
      .min(1, { message: 'O título é obrigatório' }),
    description: z
      .string()
      .max(100, { message: 'A descrição deve ter no máximo 100 caracteres' }),
    horizontalBanner: z
      .string()
      .min(1, { message: 'O banner horizontal é obrigatório' }),
    verticalBanner: z
      .string()
      .min(1, { message: 'O banner vertical é obrigatório' }),
    link: z.string().nullable(),
    status: z.enum(['active', 'inactive']),
    startDate: z.date(),
    endDate: z.date(),
  })
  .refine(data => data.endDate >= data.startDate, {
    message: 'A data final deve ser maior que a data inicial',
    path: ['endDate'],
  })
