import { z } from 'zod';

export const createTransactionSchema = z.object({
  description: z
    .string({ message: 'The description is required' })
    .min(3, 'The description must contain at least three characters'),
  amount: z
    .number({ message: 'The value is required' })
    .positive('The value must be positive'),
  type: z.enum(['income', 'expense'], {
    message: 'The type must be income or expense',
  }),
  category: z.string({ message: 'The category is required' })
  .min(1, 'The category cannot be empty'),
});

export const updateTransactionSchema = createTransactionSchema.partial();