import { z } from 'zod';

export const loginFormSchema = z.object({
	email: z.string().email().max(50),
	password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).max(50)
});

export type LoginFormSchema = typeof loginFormSchema;
