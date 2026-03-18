import { z } from 'zod';

export const taskBaseSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
});

export const createTaskSchema = taskBaseSchema;

export const updateTaskSchema = taskBaseSchema.partial();

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
