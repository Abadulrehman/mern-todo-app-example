import { z } from 'zod';

export const todoCreateFormSchema = z.object({
  title: z.string().min(1, 'Please enter a title').max(100),
});

export const todoUpdateFormSchema = z.object({
  todoId: z.string().length(24),
  title: z.string().max(100).optional(),
  completed: z.boolean().optional(),
});

export const todoDeleteSchema = z.object({
  todoId: z.string().length(24),
});