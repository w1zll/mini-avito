import z from 'zod';

export const createAdSchema = z.object({
  title: z.string().min(3),
  price: z.number().min(1),
  description: z.string().min(3),
});

export type CreateAdForm = z.infer<typeof createAdSchema>;
